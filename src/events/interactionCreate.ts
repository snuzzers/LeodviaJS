import { CommandInteraction, Events, Client } from 'discord.js';

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        let client: Client = interaction.client;
        // @ts-ignore
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            return await command.execute(interaction);
        } catch (error) {
            console.error(`Error while executing ${interaction.commandName} command:`, error);
        }
    }
}