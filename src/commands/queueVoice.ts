import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  GuildMember,
  TextChannel,
} from "discord.js";
import { Leodvia } from "../bot";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Display current song queue"),

  async execute(interaction: CommandInteraction) {
    const guild = interaction.guild;
    if (!guild) return interaction.reply("Guild only command!");

    // Display queue
    try {
      const client = interaction.client as Leodvia;
      const queue = client.distube.getQueue(guild);
      if (!queue) return interaction.reply(`Queue is empty!`);
      try {
      } catch (e) {
        return interaction.reply({ content: `${e}`, ephemeral: true });
      }
      const MAX_CHARS = 3900;
      let displayQueue = queue.songs
        .map(
          (song, i) =>
            `**${i == 0 ? "Current song:" : i + "."}** ${song.name}, ${
              song.user
            }`
        )
        .join("\n")
        .substring(0, MAX_CHARS);
      if (displayQueue.length == MAX_CHARS)
        displayQueue = displayQueue + ".........";
      https: await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Server Queue")
            .setDescription(displayQueue)
            .setColor(0xb53a49),
        ],
      });
    } catch (e) {
      return interaction.reply({
        content: `Error Occurred: \`${e}\``,
        ephemeral: true,
      });
    }
  },
};
