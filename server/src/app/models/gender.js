const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const genderSchema =  new Schema({
    name: {type:String, required: true},
}, {
    versionKey: false
})

autoIncrement.initialize(mongoose.connection);
genderSchema.plugin(autoIncrement.plugin, {
    model: 'genders',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('genders', genderSchema);
