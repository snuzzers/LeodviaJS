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
    .setName("volume")
    .setDescription("Set the volume of the music player")
    .addNumberOption((option) =>
      option
        .setName("volume")
        .setDescription("The volume to set as a number")
        .setMaxValue(100)
        .setMinValue(0)
        .setRequired(false)
    ),

  async execute(interaction: CommandInteraction) {
    //@ts-ignore
    const volume: number | null = interaction.options.getNumber("volume");
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

    // Set or display volume
    try {
      const client = interaction.client as Leodvia;
      const queue = client.distube.getQueue(guild);
      if (!queue) return interaction.reply(`Queue is empty!`);
      if (!volume)
        return interaction.reply(`Current volume is \`${queue.volume}\``);
      if (isNaN(volume))
        return interaction.reply({
          content: "Invalid number",
          ephemeral: true,
        });
      queue.setVolume(volume);
      interaction.reply(`Volume set to \`${volume}\``);
    } catch (e) {
      return interaction.reply({
        content: `Error Occurred: \`${e}\``,
        ephemeral: true,
      });
    }
  },
};
