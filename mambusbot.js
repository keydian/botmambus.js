const {Client} = require('discord.js');
const mongo = require('mongodb').MongoClient;
const client = new Client;
client.login(process.env.BOT_TOKEN).then(console.log);
client.on('ready', readyDiscord);
const url = process.env.MONGODB_URI;
let database;

mongo.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    database = db.db("botMambusJS");
    db.close();
});



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
    if(!database.collection("users").findOne({}, {projection:{ userID: message.author}})){
        let user = {userID: message.author};
        database.collection("users").insertOne(user);
    }
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

