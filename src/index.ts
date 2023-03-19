import * as dotenv from 'dotenv';
dotenv.config();
import { GatewayIntentBits } from 'discord.js';
import { Leodvia } from './bot';

const client = new Leodvia({
    intents: [ GatewayIntentBits.Guilds ]
});

client.login(process.env.TOKEN);