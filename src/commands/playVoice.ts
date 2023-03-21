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
    .setName("play")
    .setDescription("Play a song from YouTube, Spotify, or Soundcloud")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("The song or playlist URL")
        .setRequired(true)
        .setMaxLength(255)
    ),

  async execute(interaction: CommandInteraction) {
    // @ts-ignore
    const url = interaction.options.getString("url");
    const member = interaction.member as GuildMember;
    const guild = interaction.guild;
    if (!guild) return interaction.reply("Guild only command!");
    const voiceChannel = member.voice.channel;
    const clientVoiceChannel = interaction.guild!.members.me?.voice.channel;

    if (!voiceChannel) {
      return interaction.reply("You must be in a voice channel!");
    } else if (voiceChannel !== clientVoiceChannel) {
      return interaction.reply("We must share a mutual voice channel!");
    }

    // Play song
    try {
      let client = interaction.client as Leodvia;
      let distube = client.distube;
      distube.play(voiceChannel, url, {
        member: member,
        textChannel: interaction.channel as TextChannel,
      });
    } catch (e) {
      return interaction.reply({
        content: `Error Occurred: \`${e}\``,
        ephemeral: true,
      });
    }
  },
};
