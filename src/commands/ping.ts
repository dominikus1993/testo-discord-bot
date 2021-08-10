import { ICommand } from "./comamnd";
import { from, Observable,  } from "rxjs";
import Discord from "discord.js";
export const pingCmd: ICommand = {
    description: "Ping",
    name: "ping",
    execute: (msg, args) => {
        return msg.reply("I jak tam");
    }
}