const {Client} = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const client = new Client;
client.login(process.env.BOT_TOKEN).then(console.log);
client.on('ready', readyDiscord);


//variables and counters
let penis = "8D";
let macroCounter = 0;
let microCounter = 0;
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
];


function readyDiscord(){
    client.user.setPresence({
        activity: {
            name: 'Analisando Mambus Stranhus em projetos...'
        },
    }).then(console.log);
    client.channels.cache.find(channel => channel.name === "bot-spam").send("Bot logged in.").
    then(msg =>{
        msg.react("MAMBUS:775834254939652096"); //react com mambus emoji
    });
}

client.on('message', message => {
    if(!message.author.bot){

        //REACTIVE EVENTS
        if (message.content.toLowerCase().includes("birra")){ //birra trigger
            message.react("🇫"); //react 'F' emoji
            message.react("🇩"); //react 'D' emoji
            message.react("🇵"); //react 'P' emoji
        }
        if (message.content.toLowerCase().includes("damasio") || message.content.toLowerCase().includes("damásio")){  //damasio trigger
            message.react("💣");
            message.react("DamsGame:731832375486447678");
        }
        if (message.content.toLowerCase().includes("leite")){ //joao leite trigger
            let rng = Math.random();
            if(rng < 0.5){
                message.reply("Aluno/a, tome um copo de João Leite: https://ibb.co/tpX6SDt");
            }
            else message.reply("```\nCaro Aluno/a,\nOs grafos só representam restrições binárias." +
                "\nTambém foram aceites respostas que recorreram a hipergrafos, como o descrito no slide do problema" +
                " de criptoaritmética, para representar a restrição alldiff.\nCumprimentos,\nJoão Leite\n```");

        }
        if(message.content.toLowerCase().includes("mambus")){
            let rng = Math.round(Math.random() * 11); //11 = array.length-1
            message.reply(mambusArray[rng]).then(msg => {
                    msg.react("MAMBUS:775834254939652096"); //reacts with mambus
                }
            );
        }

        //MEME COMMANDS
        if(message.content.toString().toLowerCase() === "j!quem"){ //te perguntou
            message.reply("Quem te perguntou.");
        }
        if (message.content.toLowerCase().includes("macropenis") || message.content.toLowerCase().includes("macropénis")){
            penis = insert(penis, 1, "="); //increases penis size
            macroCounter++;
        }
        if(message.content.toLowerCase().includes("micropenis") || message.content.toLowerCase().includes("micropénis")){
            if(penis.length>2){
                penis = removeAt(2, penis);
                microCounter++;
            }
            else{
                message.reply("Caro aluno/a, o seu micropénis n consegue ficar mais pequeno. Não tem vergonha?");
            }
        }
        if(message.content.toString().toLowerCase() === "j!penis"){ //command to print penis and penis stats
            message.reply("\n"+ penis + "\n" +
                "Número de vezes que se invocou o macropénis desde que o bot levou update: "+macroCounter+"\n"+
                "Número de vezes que se invocou o micropénis desde que o bot levou update: "+microCounter);
        }
        if(message.content.toString().toLowerCase() === "j!pingrandom"){
            let usersArray = message.guild.members.cache.array();
            let randomUser = usersArray[Math.round(Math.random() * message.guild.memberCount)]
            let triggerChance = Math.random() * 2;
            if(triggerChance < 1){
                message.channel.send("<@"+message.author + "> acusou o/a <@"+randomUser+"> de cometer plágio.");
            }
        }
        if (message.content.toString().toLowerCase() === "j!grandegil"){
            let gil = message.guild.members.cache.get("140512163314794496");
            message.channel.send("<@"+gil+"> Grande Gil!");
        }
        if(message.content.toString().trim().startsWith("j!random")){
            let searchParameter = message.content.substr(8);
                if(searchParameter === ("")){
                    message.channel.send("Aluno/a, experimente adicionar um parâmetro à sua pesquisa, não?")
                }
                else {
                    image(message, searchParameter);
                }
        }

        //ACTUALLY USEFUL COMMANDS
        if(message.content.toString().toLowerCase() === "j!github"){
            message.reply("https://github.com/keydian/botmambus.js").then(msg =>{
                msg.react("MAMBUS:775834254939652096");
            })
        }
        if(message.content.toString().toLowerCase() === "j!githubrc"){
            message.reply("https://github.com/jlegatheaux/RC2020-assignments");
        }
        if(message.content.toString().toLowerCase() === "j!help"){
            message.channel.send("Caro aluno/a, acha que tenho tempo para o ajudar? Projetos não se corrigem sozinhos!" +
                " Use j!github, RTFM!");
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
function image(message, searchTerm) {
    let options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + searchTerm,
        method: "GET",
        headers: {
            Accept: "text/html",
            "User-Agent": "Chrome",
        },
    }
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }

        $ = cheerio.load(responseBody);

        let links = $('.image a.link');

        let urls = new Array(links.length)
            .fill(0)
            .map((v, i) => links.eq(i).attr('href'));

        console.log(urls);

        if (!urls.length) {
            return;
        }

        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
}

