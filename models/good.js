const mongoose = require('mongoose')
let GoodSchema = require('../schemas/good')
let Good = mongoose.model('Good', GoodSchema)

module.exports = Good