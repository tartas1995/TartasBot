//imports
const tables = require('./tables')
const actions = require('./actions')

//open database
const db = new Promise((resolve, reject) => {
    const sqlite3 = require('sqlite3').verbose();
    const database = new sqlite3.Database('var/tartasbot.db', (e) => {//create/open database
        if (e) {
            reject(e)
        } else {
            resolve(database)
        }
    })
}).then((database) => {//once open
    return new Promise((resolve, reject) => {
        new Promise((resolve) => {
            database.serialize(() => {//run tables sql.
                const promises = []
                for (key in tables) {
                    const table = tables[key];
                    promises.push(
                        new Promise((resolve, reject) => {
                            database.run(table, (e) => {
                                if (e) {
                                    reject(e)
                                } else {
                                    resolve()
                                }
                            });
                        })
                    )
                }
                Promise.all(promises).then(resolve)//when all done, go to next step
            })
        }).then(() => {//after table sql has run. load actions and add the close function to the actions
            const interf = actions.load(database)
            interf['close'] = () => {
                database.close()
            };
            resolve(interf)
        }).catch(reject)
    })
}).catch((e) => {
    console.error(e)
})

module.exports = db//is promise and will be object with all the actions once done
