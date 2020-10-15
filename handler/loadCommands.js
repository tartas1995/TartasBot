const Command = require('../models/command')
let commands = [];
require('../database').then((database) => {
    database.command.getAll().then((rows) => {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i]
            commands.push(new Command(row.id, row.trigger, row.response, row.channel, row.startWith, row.endWith))
        }
    })
})

module.exports = commands