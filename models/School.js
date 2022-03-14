const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    title: {type: String, required: true},
    img: {type: String, required: true},
    sports: {type: String, required: true},
    id: {type: String, required: true}
})

module.exports = model('School', schema)