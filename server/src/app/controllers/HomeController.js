const Location = require('../models/location');
const Gender = require('../models/gender');

class HomeController {

    get = async (req, res) => {
        res.send("Welcome to Xuan Vu's website");
    }

    getLocation = async (req, res) => {
        await Location.find({}, (err, docs) => {
            res.json(docs);
        })
    }

    getGender = async (req, res) => {
        await Gender.find({}, (err, docs) => {
            res.json(docs);
        })
    }
}

module.exports = new HomeController;
