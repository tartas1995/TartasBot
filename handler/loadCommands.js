/**
 * CURRENTLY NOT USED
 */
const Command = require('../models/command')//load Model Command
const Commands = require('../models/commands')//load Model Commands
let commands = new Commands();
require('../database').then((database) => {
    database.command.getAll().then((rows) => {//generate Commands based on database
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i]
            commands.push(new Command(row.id, row.trigger, row.response, row.channel, row.startWith, row.endWith))
        }
    })
})

module.exports = commands