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
    .setName("join")
    .setDescription("Join current voice channel"),

  async execute(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply("You must be in a voice channel!");
    }

    // Join VC
    try {
      let client = interaction.client as Leodvia;
      let distube = client.distube;
      distube.voices.join(voiceChannel);
      await interaction.reply(`Joined \`${voiceChannel.name}\`!`);
    } catch (e) {
      interaction.reply({
        content: `Error Occured: \`${e}\``,
        ephemeral: true,
      });
    }
  },
};
