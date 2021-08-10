import { Client, Intents, Message } from "discord.js";
import { google } from 'googleapis';
import { getCommands, getCommand, ICommand } from "./commands/comamnd";
import { Some, isSome } from 'fp-ts/lib/Option'
import { fromEvent } from "rxjs";
import { filter, map as omap, mergeMap } from 'rxjs/operators';

const yt = google.youtube({ version: "v3", auth: process.env.GOOGLE_API_KEY })

const client = new Client({ intents: Intents.FLAGS.GUILDS});

client.on("ready", () => {
  console.log("Start")
})
const commands = getCommands({ yt: yt });
const command = getCommand(commands);

fromEvent(client, "message")
  .pipe(omap((m: Message) => ({ msg: m, cmd: command(m) })),
    filter(({ cmd }) => isSome(cmd)),
    omap(x => ({ ...x, cmd: x.cmd as Some<ICommand> })),
    mergeMap(({ cmd, msg }) => {
      const c = cmd.value
      return c.execute(msg);
    }))
  .subscribe(console.log);

client.login(process.env.DISCORD_TOKEN)

