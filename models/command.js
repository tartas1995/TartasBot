class Command {
    id;//id of command (database)
    trigger;//message that trigger response
    response;//response when triggered
    channel;//channel that the command is linked to
    startWith;//true if message has to start with trigger
    endWith;//true if message has to end with trigger
    isRendered;//true if regex is rendered
    _regex;//rendered regex

    constructor(id, trigger, response, channel, startWith, endWith) {
        this.id = id
        this.trigger = trigger
        this.response = response
        this.channel = channel
        this.startWith = startWith
        this.endWith = endWith
        this.isRendered = false
        this._regex = null
    }

    edit() {//TODO think about the parameters
        this.isRendered = false
    }

    regex() {//function used to get regex. maybe use proxy in the future.
        if (!this.isRendered) {
            this.renderRegex()
        }
        return this._regex
    }

    renderRegex() {//renders the regex
        this._regex = new RegExp(`${this.startWith?'^':''}${this.trigger}${this.endWith?'$':''}`)
        this.isRendered = true
    }
}

module.exports = Command