const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    title: {type: String, required: true},
    img: {type: String, required: true},
    sports: {type: String, required: true},
    address: {type: String, required: true},
    site:{type: String, required: true},
    director: {type: String, required: true},
    phone: {type: String, required: true},
    id: {type: String, required: true}
})

module.exports = model('School_2', schema)