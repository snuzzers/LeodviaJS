import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from 'discord.js';
import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from YouTube')
        .addStringOption(option => option.setName('url').setDescription('The URL of the video to download').setRequired(true).setMaxLength(255)),

    async execute(interaction: CommandInteraction) {
        // @ts-ignore
        let url = interaction.options.getString('url');
        if (!ytdl.validateURL(url)) return await interaction.reply({ content: 'Invalid URL', ephemeral: true });

        // Join VC
        // const voiceChannel = interaction.member.voice.channel;
        // if (!voiceChannel) return await interaction.reply({ content: 'You need to be in a voice channel to play music!', ephemeral: true });
        // const connection = await voiceChannel.join();

        // // Download the video in highest audio quality
        // const stream = ytdl(url, { filter: 'audioonly', dlChunkSize: 0 });
        // const dispatcher = connection.play(stream);
        // dispatcher.on('speaking', speaking => {
        //     if (!speaking) voiceChannel.leave();
        // });

        await interaction.reply({ content: "Downloading video...", ephemeral: true });
    }
}