
const mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let GoodSchema = new mongoose.Schema({
    name: String,
    price: String,
    from: String,
    stock: String,
    image: String,
    summary: String,
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    meta: {
        createAt: {
            type : Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

GoodSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }

    next()
})

GoodSchema.statics = {
    async fetch() {
        let data = await this.find({})

        return data
    },
    async findById(id) {
        let data = this.findOne({ _id: id })

        return data
    }
}

module.exports = GoodSchema