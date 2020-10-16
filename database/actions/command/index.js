const create = require('./create')//get create function
const del = require('./delete')//get delete function
const getAll = require('./getAll')//get getAll function

//return object with all the function as attributes
module.exports = {
    create,
    getAll,
    delete: del
}