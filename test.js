/**
 * test file. this file is for testing elements on the system. i will not comment it.
 */

const Command = require('./models/channel')
const command = new Command(1, 'test', 'te', 'channel', 1, 2)
console.log(command.regex)
console.log(command._regex)
console.log(command.response)