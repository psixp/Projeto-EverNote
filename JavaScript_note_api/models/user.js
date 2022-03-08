const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema)