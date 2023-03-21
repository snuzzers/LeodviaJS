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
    .setName("stop")
    .setDescription("Clears the queue and stops all music"),

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

    // Stop queue
    try {
      const client = interaction.client as Leodvia;
      const queue = client.distube.getQueue(guild);
      if (!queue) return interaction.reply(`Queue is empty!`);
      queue.stop();
      await interaction.reply("Stopped music and cleared queue");
    } catch (e) {
      return interaction.reply({
        content: `Error Occurred: \`${e}\``,
        ephemeral: true,
      });
    }
  },
};
