import Discord from "discord.js";
import {google} from 'googleapis';

const yt = google.youtube({ version: "v3", auth: process.env.GOOGLE_API_KEY})
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Elo")
})

client.on('message', msg => {
    if (msg.content === 'kiedyś miałeś lepszy brzuch') {
      msg.reply(`ZABANOWAŁEM UŻYTKOWNIKA ${msg.author}. 
                 JAK MOGŁEŚ KURWO POWIEDZIEC ZE KIEDYS MIAŁEM LEPSZY BRZUCH.
                 NIGDY NIE MIAŁĘM LEPSZEGO BRZUCHA TY JEBANA POLSKA KURWO!!!!!!!!!!!!!!!
                 TERAZ MAM NAJLEPSZY BRZUCH !!!!!!!!!!! 
                 https://www.vidlii.com/usfi/prvw/yhjWFDcPr_z.jpg \n `);
    }
    else if (msg.content == "testo jak jest w polsce?"){
        msg.reply("https://tenor.com/view/wpolscejakwlesie-polskalas-testo-testoviron-wpolsce-jak-wchlewie-gif-12676252")
    }
    else if(msg.content == "Testo daj rolexy") {
      yt.search.list({ part: "snippet", type: "video", q: "Testoviron rolexy", maxResults: 50, order: "date"}).then(res => {
          msg.reply(res.data.items)
      })
    }
  });
console.log(process.env.DISCORD_TOKEN)
client.login(process.env.DISCORD_TOKEN)

