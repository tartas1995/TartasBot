class Commands {
    list;

    constructor() {
        this.list = []
        this[Symbol.iterator] = this.iterator
    }

    *iterator() {
        yield* this.list
    }

    remove(command) {
        let resultValue = false
        if (command.id !== null) {
            let index = this.list.findIndex(element => {
                return element.id === command.id
            })
            if (index !== -1) {
                resultValue = true
                this.list.splice(index, 1)
            }
        } else {
            let index = this.list.findIndex(element => {
                return element.trigger === command.trigger &&
                        element.channel === command.channel &&
                        element.startWith == command.startWith &&
                        element.endWith == command.endWith
            })
            if (index !== -1) {
                resultValue = true
                this.list.splice(index, 1)
            }
        }
        return resultValue
    }

    push(command) {
        this.list.push(command)
    }
}

module.exports = Commands