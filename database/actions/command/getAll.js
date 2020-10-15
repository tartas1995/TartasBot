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