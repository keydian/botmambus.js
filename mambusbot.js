const {Client} = require('discord.js');
const client = new Client;
client.login("Nzc3ODk4MzUzNzA1ODc3NTE0.X7KITA.sDaesgR1clCNwIi_845IytmCP7s");
client.on('ready', readyDiscord);


function readyDiscord(){
    client.user.setPresence({
        activity: {
            name: 'Analisando Mambus Stranhus em projetos...'
        },
    }).then(console.log("Bot connected!"));
    client.channels.cache.find(channel => channel.name === "bot-spam").send("Bot logged in.").
    then(msg =>{
        msg.react("MAMBUS:775834254939652096"); //react com mambus emoji
    });
}

client.on('message', message => {
    if(!message.author.bot){
        //ACTUALLY USEFUL COMMANDS
        if(message.content.toString().toLowerCase() === "j!github"){
            message.reply("https://github.com/keydian/botmambus.js").then(msg =>{
                msg.react("MAMBUS:775834254939652096");
            })
        }
        if(message.content.toString().toLowerCase() === "j!help"){
            message.channel.send("Caro aluno/a, acha que tenho tempo para o ajudar? Projetos não se corrigem sozinhos!" +
                " Use j!github, ERRO GRAVE!!!");
        }
    }

})

