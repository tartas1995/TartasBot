/**
 * creates array with sql for all the tables
 */

const variable = require('./variable');
const command = require('./command');


module.exports = [
    variable.table,
    command.table
]
