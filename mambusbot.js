const Discord = require('discord.js');
const client = new Discord.Client();
client.login(BOT_TOKEN).then(console.log);
client.on('ready', readyDiscord);

function readyDiscord(){
    client.user.setPresence({
        activity: {
            name: 'Analisando Mambus Stranhus em projetos...'
        },
    }).then(console.log);
    client.channels.cache.find(channel => channel.name === "bot-spam").send("Detetei Mambus Stranhus no vosso trabalho, agora vão a discussão!").
    then(msg =>{
        msg.react("MAMBUS:775834254939652096"); //react com mambus emoji
    });
}

client.on('message', message => {
    if (message.content.includes("birra")){ //birra trigger
        message.react("🇫"); //react 'F' emoji
        message.react("🇩"); //react 'D' emoji
        message.react("🇵"); //react 'P' emoji
    }
    if (message.content.includes("damasio") || message.content.includes("damásio")){  //damasio trigger
        message.react("💣");
        message.react("DamsGame:731832375486447678");
    }
    if (message.content.includes("leite")){ //joao leite trigger
        message.reply("Toma um copo de João Leite: https://ibb.co/tpX6SDt");
    }
    if(message.content.includes("mambus")){
        let rng = Math.ceil(Math.random() * 11); //11 = array.length-1
        let mambusArray = [
            "https://ibb.co/xDks7yL", //stores all mambusStranhus.png
            "https://ibb.co/Qp7Mr0z",
            "https://ibb.co/xfrc1Vw",
            "https://ibb.co/PQ119QT",
            "https://ibb.co/nfYW80t",
            "https://ibb.co/TqWkkBM",
            "https://ibb.co/yqyzSJs",
            "https://ibb.co/PgX7rNB",
            "https://ibb.co/TvK3743",
            "https://ibb.co/V37yY4D",
            "https://ibb.co/CzrXH0S",
            "https://ibb.co/zbnLcq8"
        ]
        message.reply(mambusArray[rng]).then(msg => {
            msg.react("MAMBUS:775834254939652096"); //reacts with mambus
            }
        );
    }
    if(message.content.toString() === "!quem"){ //te perguntou
        message.reply("QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? " +
            "QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? " +
            "QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? " +
            "QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? QUEM? ");
    }
})

