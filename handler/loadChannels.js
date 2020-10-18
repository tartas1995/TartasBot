const Command = require('../models/command')//load Model Command
const Channel = require('../models/channel')//load Model Channel
const channelNames = process.env.channels.split(',')
const channels = {}
require('../database').then((database) => {
    for (let channel of channelNames) {
        database.command.getFromChannel(`#${channel}`).then((rows) => {
            channels[`#${channel}`] = new Channel(channel)
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i]
                channels[`#${channel}`].push(new Command(row.id, row.trigger, row.response, row.channel, row.startWith, row.endWith))
            }
        })
    }
})

module.exports = channels