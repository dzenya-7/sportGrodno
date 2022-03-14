const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    title: {type: String, required: true},
    img: {type: String, required: true},
    date: {type: Date, default: Date.now},
    sport: {type: String, required: true},
    author: {type: String, required: true}
})

module.exports = model('Football', schema)