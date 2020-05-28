import { ICommand } from "./comamnd";
import { GoogleApis, youtube_v3 } from "googleapis";

export function getSearchYoutubeCommand(yt: youtube_v3.Youtube): () => ICommand {
    return () => ({
        description: "Szukaj filmu testo na yt",
        name: "wyszukaj",
        execute: (msg, args) => {
            const videoQ = msg.content.replace("!wyszukaj", "")
            yt.search.list({ part: "snippet", type: "video", q: `Testoviron ${videoQ}`, maxResults: 1, order: "date"}).then(res => {
                for (const item of res.data.items?.filter(x => x.id?.kind == "youtube#video") ?? []) {
                    if(item.id){
                        msg.reply(`Poczęstuj się https://www.youtube.com/watch?v=${item.id?.videoId}`)
                    }                
                }
            })
        }
    })
}