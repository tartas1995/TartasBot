const fs = require('fs');
const table = fs.readFileSync(`${__dirname}/command.sql`, 'utf8');

module.exports = {
    table
}