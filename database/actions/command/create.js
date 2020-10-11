module.exports = (db) => {
    return (trigger, response) => {
        return new Promise((resolve, reject) => {
            const stmt = db.run(
                "INSERT INTO command (trigger, response) VALUES ($trigger, $response)",
                {
                    '$trigger': trigger,
                    '$response': response
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