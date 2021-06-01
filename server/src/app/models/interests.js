const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const interestsSchema =  new Schema({
    name: String,
}, {
    versionKey: false
})

autoIncrement.initialize(mongoose.connection);
interestsSchema.plugin(autoIncrement.plugin, {
    model: 'interests',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('interests', interestsSchema);
