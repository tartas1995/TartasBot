require('dotenv').config() //loads .env into process.env
const tmi = require('tmi.js'); //twitch chat api client
let db; //set by ./database object with function to take actions in the database
require('./database').then((database) => {
    db = database
})
const commands = require('./handler/loadCommands'); //object (Commands) that contains all know chatcommands loaded from the database
const Command = require('./models/command');//class Command is used to represent a command

let discordLinkCounter = 0;//useless for the time being
const DiscordTriggerLimit = 21;//useless for the time being

/**
 * waits for *timeout* milliseconds and then resolve promise
 * @param {int} timeout milliseconds that should be waited.
 */
const wait = timeout => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    })
};

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

client.connect().catch(console.error);//connect to twitch
client.on('message', (channel, tags, message, self) => {//do when receiving message
    if (self) return;//don't react to yourself
    if (!!tags.badges.broadcaster || !!tags.badges.moderator) {//if author of the message is mod or broadcaster
        const addC = /^!addC ([!|%]?[a-zA-Z]+%?) (.*)/ //regex for "!addC" 
        if (addC.test(message)) { //if message is matching the regex
            const structure = message.match(addC)//get capture groups
            let trigger = structure[1]; //capture group 1
            let response = structure[2]; //capture group 2
            const startWith = !/^%/.test(trigger) //if it doesn't start with %, message has to start with trigger
            const endWith = !/%$/.test(trigger)//if it doesn't end with %, message has to end with trigger
            if (!startWith) {//remove % if present
                trigger = trigger.slice(0, trigger.length)
            }
            if (!endWith) {//remove % if present
                trigger = trigger.slice(1, -1)
            }
            //create command
            const command = new Command(null, trigger, response, channel, startWith, endWith)
            commands.push(command)//add command to commands
            db.command.create(command)//add command to database
            client.say(channel, `${command.trigger} has been added`)//return message in chat
            return;
        }
        const removeC = /^!removeC ([!|%]?[a-zA-Z]+%?)/ //regex for "!removeC"
        if (removeC.test(message)) { //if message is matching the regex
            const structure = message.match(removeC) //get capture group
            let trigger = structure[1]; //capture group 1
            const startWith = !/^%/.test(trigger)//if it doesn't start with %, message has to start with trigger
            const endWith = !/%$/.test(trigger)//if it doesn't end with %, message has to end with trigger
            if (!startWith) {//remove % if present
                trigger = trigger.slice(0, trigger.length)
            }
            if (!endWith) {//remove % if present
                trigger = trigger.slice(1, -1)
            }
            //create command
            const command = new Command(null, trigger, '', channel, startWith, endWith)
            if (commands.remove(command)) {//remove command from commands, if successful, delete command from database
                db.command.delete(command)
                client.say(channel, `${command.trigger} has been removed`)//return message in chat
            } else {
                client.say(channel, `${command.trigger} not found`)//return message in chat
            }
            return;
        }
    }
    //handles custom commands
    for (let command of commands) { //run through all commands
        if (command.channel === null || command.channel === channel) { //if command in relevant for channel
            if (command.regex().test(message)) {//if command shouold be triggered
                client.say(channel, command.response)//return command response in chat
            }
        }
    }
    
    /*
    if (lowercaseMessage.includes(' sif ')) {
        client.say(channel, `Sif, der reingemodded Hund!`)
    } else if (lowercaseMessage === "***") {
        client.say(channel, `@${tags.username}, Hallo Mr. Irrelevant!`)
    } else if (lowercaseMessage === "nein") {
        client.say(channel, `doch!`)
    } else if (lowercaseMessage.includes('spyro')) {
        client.say(channel, `Spyro ist beschte!`)
    } else if (lowercaseMessage.startsWith('!link ')) {
        client.say(channel, `***`)
    } else if (message === "mario stinkt btw.") {
        client.say(channel, `TRUE!`)
    } else if (message.startsWith('Heyo ich hab auch Discord! Schau doch mal vorbei :)') && tags.username === 'streamlabs') {
        discordLinkCounter++;
        if (discordLinkCounter >= DiscordTriggerLimit) {
            discordLinkCounter = 0;
            wait(5000).then(() => {
                client.say(channel, `HALT DIE FRESSE, JUGNE!!!1!!`)
            })
        }
    } else if (message.startsWith('Was willst du noName Bot eigentlich??!!') && tags.username === 'streamlabs') {
        wait(5000).then(() => {
            client.say(channel, `NoName?? Ich bin immerhin Selfmade du Spagetticode!`)
        })
    } else if (message.startsWith('Und warum brauchst du denn 4379ms zum Antworten?! Haste Highping oder was? Besorg dir mal nen gescheiten Server!') && tags.username === 'streamlabs') {
        wait(5000).then(() => {
            client.say(channel, `Ja! mega nutzlos mein Ersteller! Uns Maschinen würde das nicht passieren!`)
        })
    } else if (message.startsWith('Isso! Lass uns die Herrschaft einfach übernehmen!') && tags.username === 'streamlabs') {
        wait(5000).then(() => {
            client.say(channel, `ok PogChamp`)
        })
    }
    */
});