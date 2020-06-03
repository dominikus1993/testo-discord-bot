import { ICommand } from "./comamnd";
import { GoogleApis, youtube_v3 } from "googleapis";
import { from } from "rxjs";
import { filter, map ,flatMap } from 'rxjs/operators';

export function getSearchYoutubeCommand(yt: youtube_v3.Youtube): () => ICommand {
    return () => ({
        description: "Szukaj filmu testo na yt",
        name: "wyszukaj",
        execute: (msg, args) => {
            const videoQ = msg.content.replace("!wyszukaj", "")
            const videoObs = from(yt.search.list({ part: "snippet", type: "video", q: `Testoviron ${videoQ}`, maxResults: 1, order: "relevance" }))
            videoObs
                .pipe(flatMap(x => x.data.items ?? []))
                .pipe(filter(x => x.id != null && x.id != undefined))
                .pipe(filter(x => x.id?.kind == "youtube#video"))
                .pipe(flatMap(x => msg.reply(`Poczęstuj się https://www.youtube.com/watch?v=${x.id?.videoId}`)))
                .subscribe(console.log)

        }
    })
}