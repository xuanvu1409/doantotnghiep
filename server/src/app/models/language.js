const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const languagesSchema =  new Schema({
    _id: Number,
    name: String,
    code: String,
}, {
    versionKey: false
})

autoIncrement.initialize(mongoose.connection);
languagesSchema.plugin(autoIncrement.plugin, {
    model: 'locations',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('languages', languagesSchema);
