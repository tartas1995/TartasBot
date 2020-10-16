class Commands {
    list;//array with all the commands

    constructor() {
        this.list = []
        this[Symbol.iterator] = this.iterator//replace iterator with custom iterator
    }

    *iterator() {//act like iterator of this.list
        yield* this.list
    }

    remove(command) {//remove command from list
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