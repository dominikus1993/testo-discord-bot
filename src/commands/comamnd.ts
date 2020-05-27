import Discord from "discord.js";
import { Option, some, none, fromNullable } from 'fp-ts/lib/Option'
import { pingCmd } from './ping'
type CommandName = string;
export interface ICommand {
    readonly name: CommandName,
    readonly description: string,
    execute: (msg: Discord.Message, ...args: any[]) => void
};

export function getCommands(): Discord.Collection<CommandName, ICommand> {
    const col = new Discord.Collection<CommandName, ICommand>()
    col.set(pingCmd.name, pingCmd)
    return col;
}

const PREFIX = "!";
export function getCommand(cmds: Discord.Collection<CommandName, ICommand>): (string) => Option<ICommand>  {
    return (message: Discord.Message): Option<ICommand> => {
        if (!message.content.startsWith(PREFIX) || message.author.bot) return none;

        const args = message.content.slice(PREFIX.length).split(/ +/);
        const command = args.shift()?.toLowerCase();
        if (!command || !cmds.has(command)) return none;
        try {
            const res = cmds.get(command);
            return fromNullable(res);
        } catch (error) {
            return none;
        }
    }
}