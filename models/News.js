const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: {type: Array, required: true},
    title: {type: String, required: true},
    img: {type: String, required: true},
    date: {type: Date, default: Date.now},
})

module.exports = model('News', schema)