class Command {
    id;
    trigger;
    response;
    channel;
    startWith;
    endWith;
    isRendered;
    _regex;

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

    regex() {
        if (!this.isRendered) {
            this.renderRegex()
        }
        return this._regex
    }

    renderRegex() {
        this._regex = new RegExp(`${this.startWith?'^':''}${this.trigger}${this.endWith?'$':''}`)
        this.isRendered = true
    }
}

module.exports = Command