const tables = require('./tables')
const actions = require('./actions')

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
    return new Promise((resolve) => {
        new Promise((resolve) => {
            database.serialize(() => {
                for (key in tables) {
                    const table = tables[key];
                    database.prepare(table).run().finalize();
                }
                resolve()
            })
        }).then(() => {
            actions['close'] = () => {
                database.close()
            };
            resolve(actions.load(database))
        })
    })
})

module.exports = db