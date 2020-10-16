const fs = require('fs');//get filesystem
const table = fs.readFileSync(`${__dirname}/variable.sql`, 'utf8');//load variable.sql as string

module.exports = {
    table
}