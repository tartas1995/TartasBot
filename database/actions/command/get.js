module.exports = (db) => {
    return (message, channel) => {
        return new Promise((resolve, reject) => {
            const stmt = db.run(
                "SELECT trigger, response FROM command WHERE trigger LIKE $message AND (channel = $channel OR channel IS NULL)",
                {
                    $message: message,
                    $channel: channel,
                },
                (err, row) => {
                    console.log(row)
                    if (!!err) {
                        reject(err)
                    }
                    if (row === undefined) {
                        resolve(null)
                    } else {
                        resolve(row)
                    }
                }
            )
        })
    }
}