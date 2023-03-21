import * as dotenv from "dotenv";
dotenv.config();
import { GatewayIntentBits, Partials } from "discord.js";
import { Leodvia } from "./bot";

const client = new Leodvia({
  partials: [Partials.Channel, Partials.GuildMember, Partials.User],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.login(process.env.TOKEN);
