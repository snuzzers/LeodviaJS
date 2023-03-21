import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  TextChannel,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cleanup")
    .setDescription(
      "Clears command history from chat (only deletes messages from this bot)"
    )
    .addNumberOption((option) =>
      option
        .setName("count")
        .setRequired(false)
        .setMaxValue(100)
        .setMinValue(1)
        .setDescription("Number of messages to delete")
    ),

  async execute(interaction: CommandInteraction) {
    //@ts-ignore
    let count: number | null = interaction.options.getNumber("count");
    if (!count) count = 25;

    const channel = interaction.channel as TextChannel;
    const fetched = await channel.messages.fetch({ limit: count });
    const botMessages = fetched.filter(
      (m) => m.author.id === interaction.client.user.id
    );
    channel
      .bulkDelete(botMessages)
      .then((messages) =>
        interaction.reply({
          content: `Deleted \`${messages.size}\` self messages.`,
          ephemeral: true,
        })
      )
      .catch((error) => {
        console.error(error);
        interaction.reply({
          content: "An error occurred while trying to delete messages.",
          ephemeral: true,
        });
      });
  },
};
