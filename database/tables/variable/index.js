const fs = require('fs');
const table = fs.readFileSync(`${__dirname}/variable.sql`, 'utf8');

module.exports = {
    table
}