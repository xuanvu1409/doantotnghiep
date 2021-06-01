const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderSchema =  new Schema({
    _id: Number,
    name: String,
}, {
    versionKey: false
})

module.exports = mongoose.model('genders', genderSchema);
