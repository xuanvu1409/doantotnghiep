const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actionSchema =  new Schema({
    actionMember: {type:Number, required: true, ref: 'members'},
    actionBy: {type:Number, required: true, ref: 'members'},
    type: {type: Number, required: true}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('actions', actionSchema);