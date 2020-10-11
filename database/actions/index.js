const command = require('./command')

const actions = {
    command
}

const load = (db) => {
    const actionCollection = {}
    for (let sectionKey in actions) {
        const section = actions[sectionKey]
        if (!actionCollection[sectionKey]) {
            actionCollection[sectionKey] = {}
        }
        for (let actionKey in section) {
            const actionHandler = section[actionKey]
            actionCollection[sectionKey][actionKey] = actionHandler(db);
        }
    }
    return actionCollection
}

module.exports = {
    load
}