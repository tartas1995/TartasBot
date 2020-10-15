require('./database').then((db) => {
    db.command.create('nein', 'doch!', true, true, null)
})