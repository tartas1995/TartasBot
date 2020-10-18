const Commands = require("./commands")

class Channel {
    channel;
    commands;

    constructor(channel) {
        this.channel = channel
        this.commands = new Commands()
    }


    push(command) {
        this.commands.push(command)
    }

    remove(command) {
        return this.commands.remove(command)
    }

}

module.exports = Channel