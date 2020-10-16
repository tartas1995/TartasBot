/**
 * TODO: finish this function.
 * function that returns a function with access to the database.
 * the return function is used to get command from the database
 * @param {sqlite3.Database} db 
 */
module.exports = (db) => {
    return (command) => {
        return new Promise((resolve, reject) => {
            const stmt = db.get(
                "SELECT * FROM command where ",
                {
                    $id: command.id,
                    $channel: channel,
                },
                (err, rows) => {
                    if (!!err) {
                        reject(err)
                    }
                    if (rows === undefined) {
                        resolve(null)
                    } else {
                        resolve(rows)
                    }
                }
            )
        })
    }
}