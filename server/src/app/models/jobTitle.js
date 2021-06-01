const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const jobTitlesSchema =  new Schema({
    name: String,
}, {
    versionKey: false
})

autoIncrement.initialize(mongoose.connection);
jobTitlesSchema.plugin(autoIncrement.plugin, {
    model: 'jobTitles',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('jobTitles', jobTitlesSchema);