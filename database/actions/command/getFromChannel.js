/**
 * function that returns a function with access to the database.
 * the return function is used to get all commands of a channel from the database
 * @param {sqlite3.Database} db 
 */
module.exports = (db) => {
    return (channel) => {
        return new Promise((resolve, reject) => {
            const stmt = db.all(
                "SELECT * FROM command where channel=$channel or channel is null",
                {
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