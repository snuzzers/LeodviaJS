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
    .setName("nowplaying")
    .setDescription("Displays current song"),

  async execute(interaction: CommandInteraction) {
    const guild = interaction.guild;
    if (!guild) return interaction.reply("Guild only command!");
    const clientVoiceChannel = guild.members.me?.voice.channel;

    if (!clientVoiceChannel) {
      return;
    }

    // Display song
    try {
      const client = interaction.client as Leodvia;
      const queue = client.distube.getQueue(guild);
      if (!queue) return interaction.reply(`Queue is empty!`);
      const song = queue.songs[0];
      await interaction.reply(`Now playing **${song.name}**, by ${song.user}`);
    } catch (e) {
      return interaction.reply({
        content: `Error Occurred: \`${e}\`\nHint: Did you mean /stop?`,
        ephemeral: true,
      });
    }
  },
};
