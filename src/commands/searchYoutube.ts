import { ICommand } from "./comamnd";
import { youtube_v3 } from "googleapis";
import { from } from "rxjs";
import { filter, mergeMap } from 'rxjs/operators';

export function getSearchYoutubeCommand(yt: youtube_v3.Youtube): () => ICommand {
    return () => ({
        description: "Szukaj filmu testo na yt",
        name: "wyszukaj",
        execute: (msg, args) => {
            const videoQ = msg.content.replace("!wyszukaj", "")
            const videoObs = from(yt.search.list({ part: "snippet", type: "video", q: `Testoviron ${videoQ}`, maxResults: 1, order: "relevance" }))
            return videoObs
                .pipe(mergeMap(x => x.data.items ?? []),
                    filter(x => x.id != null && x.id != undefined),
                    filter(x => x.id?.kind == "youtube#video"),
                    mergeMap(x => msg.reply(`Poczęstuj się https://www.youtube.com/watch?v=${x.id?.videoId}`)))
                    .toPromise()
        }
    })
}