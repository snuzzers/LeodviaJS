import { SlashCommandBuilder, MessagePayload, CommandInteraction } from 'discord.js';
import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';

module.exports = {
    data: new SlashCommandBuilder()
		.setName('download')
		.setDescription('Downloads a video from YouTube')
        .addStringOption(option => option.setName('url').setDescription('The URL of the video to download').setRequired(true).setMaxLength(255)),

	async execute(interaction: CommandInteraction) {
		// @ts-ignore
		let url = interaction.options.getString('url');
		// Validate URL
		if (!ytdl.validateURL(url)) return await interaction.reply({ content: 'Invalid URL', ephemeral: true });
		// Limit video length to 4 minutes
		const videoInfo = await ytdl.getInfo(url);
		if (Number(videoInfo.videoDetails.lengthSeconds) > 360) return await interaction.reply({ content: 'Video is too long!', ephemeral: true });

		// Download video
		const tempPath = path.join(__dirname, '../../', 'temp', videoInfo.videoDetails.videoId); // Where to save the video
		const stream = ytdl(url, { quality: 'highestaudio' });
		stream.pipe(fs.createWriteStream(`${tempPath}.mp4`));

		// Upload video to channel
		await interaction.channel!.send({ content: 'Downloading video...', files: [`${tempPath}.mp4`] });

		// Delete video from temp folder
		fs.unlinkSync(`${tempPath}.mp4`);
	}
}