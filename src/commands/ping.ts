import { ICommand } from "./comamnd";

export const pingCmd: ICommand = {
    description: "Ping",
    name: "ping",
    execute: (msg, args) => {
        return msg.reply("I jak tam");
    }
}