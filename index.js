require('dotenv').config()
const tmi = require('tmi.js');
let db;
require('./database').then((database) => {
    db = database
})
const commands = require('./handler/loadCommands');
const Command = require('./models/command');

let discordLinkCounter = 0;
const DiscordTriggerLimit = 21;

const wait = timeout => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    })
};

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

client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
    if (self) return;
    console.log(commands)
    const addC = /^!addC ([!|%]?[a-zA-Z]+%?) (.*)/
    if (addC.test(message)) {
        const structure = message.match(addC)
        let trigger = structure[1];
        let response = structure[2];
        const startWith = !/^%/.test(trigger)
        const endWith = !/%$/.test(trigger)
        if (!startWith) {
            trigger = trigger.slice(0, trigger.length)
        }
        if (!endWith) {
            trigger = trigger.slice(1, -1)
        }
        const command = new Command(null, trigger, response, channel, startWith, endWith)
        commands.push(command)
        db.command.create(command)
        return;
    }
    const removeC = /^!removeC ([!|%]?[a-zA-Z]+%?)/
    if (addC.test(message)) {
        const structure = message.match(addC)
        let trigger = structure[1];
        const startWith = !/^%/.test(trigger)
        const endWith = !/%$/.test(trigger)
        if (!startWith) {
            trigger = trigger.slice(0, trigger.length)
        }
        if (!endWith) {
            trigger = trigger.slice(1, -1)
        }
        const command = new Command(null, trigger, response, channel, startWith, endWith)
        commands.push(command)
        db.command.delete(command)
        return;
    }
    for (let key in commands) {
        const command = commands[key]
        if (command.channel === null || command.channel === channel) {
            if (command.regex().test(message)) {
                client.say(channel, command.response)
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