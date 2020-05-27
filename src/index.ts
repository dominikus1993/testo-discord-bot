import Discord from "discord.js";
import {google} from 'googleapis';
import { getCommands, getCommand } from "./commands/comamnd";
import { Option, map, isSome } from 'fp-ts/lib/Option'

const yt = google.youtube({ version: "v3", auth: process.env.GOOGLE_API_KEY})
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Elo")
})
const commands = getCommands();
const command = getCommand(commands);
client.on('message', msg => {
    const cmd = command(msg);
    if (isSome(cmd)) {
      const c = cmd.value;
      c.execute(msg);
    }
});
console.log(process.env.DISCORD_TOKEN)
client.login(process.env.DISCORD_TOKEN)

