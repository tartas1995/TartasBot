require('./database').then((db) => {
    db.command.create('nein', "doch!").then(db.close)
})