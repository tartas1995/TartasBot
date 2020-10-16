/**
 * function that returns a function with access to the database.
 * the return function is used to create command in the database
 * @param {sqlite3.Database} db 
 */
module.exports = (db) => {
    return (command) => {
        return new Promise((resolve, reject) => {
            const stmt = db.run(
                "INSERT INTO command (trigger, response, channel, startWith, endWith) VALUES ($trigger, $response, $channel, $startWith, $endWith)",
                {
                    '$trigger': command.trigger,
                    '$response': command.response,
                    '$channel': command.channel,
                    '$startWith': command.startWith,
                    '$endWith': command.endWith,
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