const Location = require('../models/location');
const Gender = require('../models/gender');
const Member = require('../models/member');

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

    spotlight = async (req, res) => {
        try {
            const spotlight = await Member.find({}).sort('-like').limit(12);
            return res.json(spotlight);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    checkLogin = (req, res) => {
        return res.json(true);
    }
}

module.exports = new HomeController;
