/**
 * function that returns a function with access to the database.
 * the return function is used to get all commands from the database
 * @param {sqlite3.Database} db 
 */
module.exports = (db) => {
    return () => {
        return new Promise((resolve, reject) => {
            const stmt = db.all(
                "SELECT * FROM command",
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