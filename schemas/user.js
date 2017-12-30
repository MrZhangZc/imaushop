
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let UserSchema = new mongoose.Schema({
    name: {
      unique: true,
      type : String,  
    },
    password: {
        unique: true,
        type: String,
    },
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

UserSchema.pre('save', function (next) {
    let user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods = {
    async conparePassword(_password) {
        let zzc = await bcrypt.compare(_password, this.password)

        return zzc
    }
}

UserSchema.statics = {
    async fetch() {
        let data = await this.find({})

        return data
    },
    async findById(id) {
        let data = this.findOne({ _id: id })

        return data
    }
}

module.exports = UserSchema