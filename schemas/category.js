
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let CategorySchema = new Schema({
    name: String,
    goods : [{
        type : ObjectId,
        ref : 'Good'
    }],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

CategorySchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

CategorySchema.statics = {
    async fetch() {
        let data = await this.find({})

        return data
    },
    async findById(id) {
        let data = this.findOne({ _id: id })

        return data
    }
}

module.exports = CategorySchema