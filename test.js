require('./database').then((db) => {
    /*db.command.create('nein', 'doch!', 1, 1).then(() => {
        
    })*/
    db.command.get('nein', 'tartas1995').then((row) => {
        console.log(row)
    }).catch(console.error)
    /*db.command.delete('nein').then((row) => {
        console.log(row)
    }).catch(console.error)*/
})