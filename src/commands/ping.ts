import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction: CommandInteraction) {
		// Send embed
        await interaction.reply({ embeds: [
            new EmbedBuilder()
                .setTitle('Pong! 🏓')
                .setFields([
                    { name: 'Latency 📊', value: `${Date.now() - interaction.createdTimestamp}ms` },
                    { name: 'API Latency 💹', value: `${Math.round(interaction.client.ws.ping)}ms` }
                ])
                .setColor('#c1a2ff')
        ] });
	}
}