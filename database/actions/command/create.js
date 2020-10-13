module.exports = (db) => {
    return (trigger, response, startWith, endWith, channel = null) => {
        return new Promise((resolve, reject) => {
            if (!startWith) {
                trigger = `%${trigger}`
            }
            if (!endWith) {
                trigger = `${trigger}%`
            }
            const stmt = db.run(
                "INSERT INTO command (trigger, response, channel) VALUES ($trigger, $response, $channel)",
                {
                    '$trigger': trigger,
                    '$response': response,
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