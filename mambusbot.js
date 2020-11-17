const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.data = require("./data.json");
client.login(process.env.BOT_TOKEN).then(console.log);
client.on('ready', readyDiscord);

//variables and counters
let penis = client.data["penis"];
let macroCounter = client.data["macroCounter"];
let microCounter = client.data["microCounter"];


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
    if(!message.author.bot){
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
        if (message.content.includes("macropenis") || message.content.includes("macropénis")){
            penis = insert(penis, 1, "="); //increases penis size
            macroCounter++;
            client.data["penis"] = penis;
            client.data["macroCounter"]++;
            fs.writeFile("./data.json", JSON.stringify(client.data, null, 2), err =>{
                if (err) console.log(err);
            })
        }
        if(message.content.includes("micropenis") || message.content.includes("micropénis")){
            if(penis.length>2){
                penis = removeAt(2, penis);
                microCounter++;
                client.data["penis"] = penis;//decreases penis size
                client.data["microCounter"]++;
                fs.writeFile("./data.json", JSON.stringify(client.data, null, 2), err =>{
                    if (err) console.log(err);
                })
            }
            else{
                message.reply("Olha lá, o teu micropénis n consegue ficar mais pequeno. Não tens vergonha?");
            }
        }
        if(message.content.toString() === "!penis"){ //command to print penis and penis stats
            message.reply("\n"+ penis + "\n" +
                "Número de vezes que se invocou o macropénis: "+macroCounter+"\n"+
                "Número de vezes que se invocou o micropénis: "+microCounter);
        }
        if(message.content.toString() === "!github"){
            message.reply("https://github.com/keydian/botmambus.js").then(msg =>{
                msg.react("MAMBUS:775834254939652096");
            })
        }
    }
})






//Functions for miscellaneous use (not really the bots central code)
function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}
function removeAt(i, str) {
    let tmp = str.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}

