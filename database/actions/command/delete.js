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