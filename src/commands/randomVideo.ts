import { ICommand } from "./comamnd";
import { GoogleApis, youtube_v3 } from "googleapis";

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
        }
    })
}