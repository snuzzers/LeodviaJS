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
    .setName("pause")
    .setDescription("Pause the queue. Unpauses if already paused"),

  async execute(interaction: CommandInteraction) {
    const guild = interaction.guild;
    if (!guild) return interaction.reply("Guild only command!");
    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel;
    const clientVoiceChannel = guild.members.me?.voice.channel;

    if (!clientVoiceChannel) {
      return;
    } else if (voiceChannel !== clientVoiceChannel) {
      return interaction.reply("We must share a mutual voice channel!");
    }

    // Pause queue
    try {
      const client = interaction.client as Leodvia;
      const queue = client.distube.getQueue(guild);
      if (!queue) return interaction.reply(`Queue is empty!`);
      if (queue.paused) {
        queue.resume();
        return interaction.reply("Resuming queue");
      }
      queue.pause();
      await interaction.reply("Paused");
    } catch (e) {
      return interaction.reply({
        content: `Error Occurred: \`${e}\`\nHint: Did you mean /stop?`,
        ephemeral: true,
      });
    }
  },
};
