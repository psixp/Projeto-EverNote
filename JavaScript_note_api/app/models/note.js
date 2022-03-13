const mongoose = require('mongoose')

let NoteSchema = new mongoose.Schema({
    title: String,
    body: String,
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

NoteSchema.index({'title': 'text', 'body':'text'})

module.exports = mongoose.model('Note', NoteSchema)