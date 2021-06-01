const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const locationSchema =  new Schema({
    _id: Number,
    name: String,
}, {
    versionKey: false
})

autoIncrement.initialize(mongoose.connection);
locationSchema.plugin(autoIncrement.plugin, {
    model: 'locations',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('locations', locationSchema);
