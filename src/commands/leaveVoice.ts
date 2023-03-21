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
    .setName("leave")
    .setDescription("Leave current voice channel"),

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
    // Join VC
    try {
      let client = interaction.client as Leodvia;
      let distube = client.distube;
      distube.voices.leave(clientVoiceChannel);
    } catch (e) {
      interaction.reply({
        content: `Error Occured: \`${e}\``,
        ephemeral: true,
      });
    }

    return interaction.reply("See ya'!");
  },
};
