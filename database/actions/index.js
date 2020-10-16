const command = require('./command')//get object with all the command related database functions

const actions = {//create object with all entites in the database
    command
}
/**
 * converts actions object by rebuilding object and replace the function with the return value of the functions
 * @param {sqlite3.Database} db 
 */
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