import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import sqlite3 from 'sqlite3';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user for given reason')
        .addUserOption(option => option.setName('user').setDescription('User to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the warning').setRequired(false).setMaxLength(255))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction: CommandInteraction) {
        let target = interaction.options.getUser('user');
        let member = await interaction.guild!.members.fetch(target!.id);
        // @ts-ignore
        let reason = interaction.options.getString('reason') ?? "no reason provided";

        try {
            await member.timeout(5, reason);
            await interaction.reply(`Successfully warned ${target!.tag} for ${reason}`);
        } catch (err) {
            await interaction.reply({ content: `Could not warn ${target!.tag}\n\`${err}\``, ephemeral: true });
        }
    }
}