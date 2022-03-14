const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    sport: {type: String, required: true},
    year: {type: String, required: true}
})

module.exports = model('Champions', schema)