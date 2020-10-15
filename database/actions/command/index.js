const create = require('./create')
const del = require('./delete')
const getAll = require('./getAll')

module.exports = {
    create,
    getAll,
    delete: del
}