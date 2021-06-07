const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesShema = new Schema({
    memberId: {type: Number, required: true},
    srcImage: {type: String, required: true},
    cloudinaryId: String
}, {
    versionKey: false
})

module.exports = mongoose.model('images', ImagesShema);