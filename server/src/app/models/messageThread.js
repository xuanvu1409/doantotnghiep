const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageThreadSchema =  new Schema({
    to: {type: Number, required: true, ref: 'members'},
    from: {type: Number, required: true, ref: 'members'},
    status: {type: Number},
    lastMessage: String,
    notRead: {type: Number, default: 0}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('messageThreads', messageThreadSchema);
