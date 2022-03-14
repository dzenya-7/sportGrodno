const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    url: {type: String, required: true},
    title: {type: String, required: true},
    sport: {type: String, required: true},
})

module.exports = model('translation', schema)