const tables = require('./tables')

const db = new Promise((resolve, reject) => {
    const sqlite3 = require('sqlite3').verbose();
    const database = new sqlite3.Database('var/tartasbot.db', (e) => {
        if (e) {
            reject(e)
        } else {
            resolve(database)
        }
    })
}).then((database) => {
    database.serialize(() => {
        for (key in tables) {
            const table = tables[key];
            database.prepare(table).run().finalize();
        }
    })
})

const close = () => {
    db.then(() => {
        db.close()
    })
}

module.exports = {
    db,
    close
};