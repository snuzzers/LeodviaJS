import { Client, ClientOptions, Collection } from "discord.js";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { YtDlpPlugin } from "@distube/yt-dlp";
import path from "path";
import fs from "fs";
import * as config from "./config.json";

/**
 * The main class for the bot.
 * @extends Client
 */
class Leodvia extends Client {
  private config;
  private commands;
  public distube: DisTube;
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.config = config;
    // DisTube
    this.distube = new DisTube(this, {
      leaveOnStop: false,
      emitNewSongOnly: true,
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      plugins: [
        new SpotifyPlugin({
          emitEventsAfterFetching: true,
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
      ],
    });
    this.Initialize(); // Initialize the bot
  }

  /**
   * Initialize the bot!
   */
  private Initialize() {
    // Push commands to class collection
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const command = require(`${commandsPath}/${file}`);
      this.commands.set(command.data.name, command);
    }

    // Initialize Events
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of eventFiles) {
      const event = require(`${eventsPath}/${file}`);
      if (event.once) {
        this.once(event.name, (...args) => event.execute(...args));
      } else {
        this.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
}

export { Leodvia };
