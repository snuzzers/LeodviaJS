import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pfp')
        .setDescription('Fetches a user\'s profile picture.')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show').setRequired(false)),

    async execute(interaction: CommandInteraction) {
        let target = interaction.options.getUser('target') ?? interaction.user;
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(target.username)
                    .setImage(target.displayAvatarURL())
                    .setColor('#f2edc9')
            ]
        });
    },
};
