const {Client} = require('discord.js');
const mongo = require('mongodb').MongoClient;
const client = new Client;
client.login(process.env.BOT_TOKEN);
client.on('ready', readyDiscord);
const url = encodeURI(process.env.MONGODB_URI);
let database;

mongo.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    database = db.db("botMambusJS");
    let firstRun = database.collection("boolean").find({name: "firstRun"}).limit(1).next();
    if(firstRun.toString().includes("value: true")){
        const server = client.guilds.cache.get("398569110885367817")
        server.members.cache.forEach(member => {
                let userData = {userID: member.id, userName: member.userName, balance: 0};
                database.collection("users").insertOne(userData);
                console.log("User added to database.")
            }
        )
        database.collection("boolean").updateOne({name: firstRun},{$set:{'value':'false'}});
    }



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
    if(!message.author.bot){
        //Adds user to database if said user isnt already in the database
        isUserOnDatabase(message);
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

