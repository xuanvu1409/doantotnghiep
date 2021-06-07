const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderSchema =  new Schema({
    _id: Number,
    name: {type:String, required: true},
}, {
    versionKey: false
})

module.exports = mongoose.model('genders', genderSchema);
