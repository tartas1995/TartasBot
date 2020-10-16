/**
 * function that returns a function with access to the database.
 * the return function is used to delete command in the database
 * @param {sqlite3.Database} db 
 */
module.exports = (db) => {
    return (command) => {
        return new Promise((resolve, reject) => {
            const stmt = db.run(
                "DELETE FROM command WHERE trigger = $trigger and channel = $channel",
                {
                    '$trigger': command.trigger,
                    '$channel': command.channel,
                },
                (err) => {
                    if (!!err) {
                        reject(err)
                    }
                    resolve()
                }
            )
        })
    }
}
