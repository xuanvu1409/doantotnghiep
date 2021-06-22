const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationshipSchema =  new Schema({
    relatingId: {type:Number, required: true, ref: 'members'},
    relatedId: {type:Number, required: true, ref: 'members'},
    status: {type:Number, required: true},
    content: {type:String}
}, {
    versionKey: false
})

module.exports = mongoose.model('relationships', relationshipSchema);