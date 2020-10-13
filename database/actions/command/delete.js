module.exports = (db) => {
    return (trigger, channel = null) => {
        return new Promise((resolve, reject) => {
            const stmt = db.run(
                "DELETE FROM command WHERE trigger = $trigger and channel = $channel",
                {
                    '$trigger': trigger,
                    '$channel': channel,
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