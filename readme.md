# TartasBot

## TODO

- regex as trigger for commands

## Motivation

I am really bored.


### dev notes

#### index.js

old bot commands
```javascript
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
```