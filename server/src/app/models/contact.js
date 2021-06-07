const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema =  new Schema({
    name: {type:String, required:true},
    value: {type:String, required: true},
    memberId: {type: Number, required: true},
    isHide: {type: Boolean, default: false}
}, {
    versionKey: false
})

module.exports = mongoose.model('contacts', contactSchema);
