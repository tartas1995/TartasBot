/**
 * test file. this file is for testing elements on the system. i will not comment it.
 */

require('./database').then((db) => {
    db.command.create('nein', 'doch!', true, true, null)
})