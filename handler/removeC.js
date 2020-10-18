const Command = require('../models/command');//class Command is used to represent a command
module.exports = (channel, tags, message, channels, db, client) => {
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
        if (channels[channel].remove(command)) {//remove command from commands, if successful, delete command from database
            db.command.delete(command)
            client.say(channel, `${command.trigger} has been removed`)//return message in chat
        } else {
            client.say(channel, `${command.trigger} not found`)//return message in chat
        }
        return true
    }
    return false
}