const fs = require('fs');//get filesystem
const table = fs.readFileSync(`${__dirname}/command.sql`, 'utf8');//load command.sql as string

module.exports = {
    table
}