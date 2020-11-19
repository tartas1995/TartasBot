module.exports = (client) => {
    setInterval(() => {
        tell(client)
    }, 1000 * 60 * 20)
}

function tell(client) {
    client.say('#d4rn4s', 'Leute! Ihr koennt Essen an Arme spenden oder aber etwas viel cooleres machen! Spendet eure Channel Points an eine gute Sache. Lasst den Fettsack Sport machen! Ihr koennt 2K pro Stream spenden!')
}