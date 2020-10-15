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