const create = require('./create')
const del = require('./delete')
const get = require('./get')

module.exports = {
    create,
    get,
    delete: del
}