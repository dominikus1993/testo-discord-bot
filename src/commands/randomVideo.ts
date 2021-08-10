import { ICommand } from "./comamnd";
import { GoogleApis, youtube_v3 } from "googleapis";
import Discord from "discord.js";
import { from } from "rxjs";
import { filter, map, flatMap, first, skipUntil, skipWhile, take } from 'rxjs/operators';

export function getRandomYoutubeCommand(yt: youtube_v3.Youtube): () => ICommand {
    return () => ({
        description: "Losuj film z testo na yt",
        name: "losuj",
        execute: (msg, args) => {
            yt.search.list({ part: "snippet", type: "video", q: `Testoviron`, maxResults: 50, order: "relevance" }).then(res => {
                const result = res.data.items?.filter(x => x.id?.kind == "youtube#video") ?? [];
                const randomVideo = result[Math.floor(Math.random() * result.length)];
                if (randomVideo && randomVideo.id) {
                    msg.reply(`Poczęstuj się https://www.youtube.com/watch?v=${randomVideo.id?.videoId}`)
                }
            })

            const videoQ = msg.content.replace("!wyszukaj", "")
            const videoObs = from(yt.search.list({ part: "snippet", type: "video", q: `Testoviron`, maxResults: 50, order: "relevance" }))
            return videoObs
                .pipe(flatMap(x => x.data.items ?? []),
                    filter(x => x.id != null && x.id != undefined),
                    filter(x => x.id?.kind == "youtube#video"),
                    skipWhile(_ => Math.random() < 0.5),
                    take(1),
                    flatMap(x => msg.reply(`Poczęstuj się https://www.youtube.com/watch?v=${x.id?.videoId}`)))
                .toPromise();
        }
    })
}