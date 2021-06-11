const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const memberSchema =  new Schema({
    profileId: {type: String, unique: true},
    avatar:  {srcImage: String, cloudinaryId: String},
    name:  {type: String, required: true},
    email:  {type: String, unique: true},
    locationId: {type: Number, required: true, ref: 'locations'},
    password:  {type: String, required: true},
    dateOfBirth:  {type: Date, required: true},
    isClose: {type: Boolean, default: false},
    isConfirm: {type: Boolean, default: false},
    genderId: {type: Number, required: true, ref: 'genders'},
    workAndEducation: {jobTitle: String, company: String, education: String},
    interestsId: [{type: Number, ref: 'interests'}],
    languageId: [{type: Number, ref: 'languages'}],
    personalInfo: Array,
    packageInfo: Object,
    deletedAt: Date
}, {
    timestamps: true,
    versionKey: false
})

autoIncrement.initialize(mongoose.connection);
memberSchema.plugin(autoIncrement.plugin, {
    model: 'members',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
module.exports = mongoose.model('members', memberSchema);
