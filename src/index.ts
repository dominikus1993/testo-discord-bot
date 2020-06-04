import Discord from "discord.js";
import { google } from 'googleapis';
import { getCommands, getCommand, ICommand } from "./commands/comamnd";
import { Option, Some, map, isSome } from 'fp-ts/lib/Option'
import { fromEvent } from "rxjs";
import { filter, map as omap, flatMap } from 'rxjs/operators';

const yt = google.youtube({ version: "v3", auth: process.env.GOOGLE_API_KEY })

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Elo")
})
const commands = getCommands({ yt: yt });
const command = getCommand(commands);

fromEvent(client, "message")
  .pipe(omap((m: Discord.Message) => ({ msg: m, cmd: command(m) })))
  .pipe(filter(({ cmd }) => isSome(cmd)))
  .subscribe(({cmd, msg}) => {
    const c = (cmd as Some<ICommand>).value;
    c.execute(msg)
  });

console.log(process.env.DISCORD_TOKEN)
client.login(process.env.DISCORD_TOKEN)

