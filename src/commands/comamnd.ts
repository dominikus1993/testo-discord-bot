import Discord from "discord.js";
import { Option, none, fromNullable } from 'fp-ts/lib/Option'
import { pingCmd } from './ping'
import {youtube_v3} from 'googleapis';
import { getSearchYoutubeCommand } from "./searchYoutube";
import { getRandomYoutubeCommand } from "./randomVideo";

type CommandName = string;

export interface IDependencies {
    readonly yt: youtube_v3.Youtube
}

export interface ICommand {
    readonly name: CommandName,
    readonly description: string,
    execute: (msg: Discord.Message, ...args: any[]) => Promise<Discord.Message>
};

export function getCommands(ioc: IDependencies): Discord.Collection<CommandName, ICommand> {
    const col = new Discord.Collection<CommandName, ICommand>()
    col.set(pingCmd.name, pingCmd)
    const searchVideo = getSearchYoutubeCommand(ioc.yt)();
    col.set(searchVideo.name, searchVideo)
    const randomVideo = getRandomYoutubeCommand(ioc.yt)();
    col.set(randomVideo.name, randomVideo)
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