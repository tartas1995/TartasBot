const Command = require('../models/command');//class Command is used to represent a command
module.exports = (channel, tags, message, channels, db, client) => {
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
        channels[channel].push(command)//add command to commands
        db.command.create(command)//add command to database
        client.say(channel, `${command.trigger} has been added`)//return message in chat
        return true
    }
    return false
}