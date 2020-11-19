require('dotenv').config() //loads .env into process.env
const tmi = require('tmi.js'); //twitch chat api client
let db; //set by ./database object with function to take actions in the database
const databaseLoaded = require('./database')
databaseLoaded.then((database) => {
    db = database
})
const channels = require('./handler/loadChannels'); //object (Commands) that contains all know chatcommands loaded from the database
const isMod = require('./utils/isMod')
const isStreamer = require('./utils/isStreamer')
const addC = require('./handler/addC')
const removeC = require('./handler/removeC')

let discordLinkCounter = 0;//useless for the time being
const DiscordTriggerLimit = 21;//useless for the time being

//twitch chat client
const client = new tmi.Client({
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true,
    },
    identity: {
        username: process.env.username,
        password: process.env.password,
    },
    channels: process.env.channels.split(',')
});

client.on("connected", (address, port) => {
    require('./sportstreamNotification')(client)
});

databaseLoaded.then(() => {
    client.connect().catch(console.error);//connect to twitch
})

client.on('message', (channel, tags, message, self) => {//do when receiving message
    if (self) return;//don't react to yourself
    if (isStreamer(tags) || isMod(tags)) {//if author of the message is mod or broadcaster
        if (addC(channel, tags, message, channels, db, client)) return
        if (removeC(channel, tags, message, channels, db, client)) return
    }
    //handles custom commands
    for (let command of channels[channel].commands) { //run through all commands of this channel or global commands
        if (command.regex.test(message)) {//if command shouold be triggered
            client.say(channel, command.getResponse(channel, tags, message))//return command response in chat
            return
        }
    }
});