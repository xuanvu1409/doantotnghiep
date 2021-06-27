const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageThreadSchema =  new Schema({
    to: {type: Number, required: true, ref: 'members'},
    from: {type: Number, required: true},
    status: {type: Number}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('messageThreads', messageThreadSchema);
