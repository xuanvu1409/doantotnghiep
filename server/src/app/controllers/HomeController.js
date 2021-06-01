const Location = require('../models/location');
const Gender = require('../models/gender');
const JobTitle = require('../models/jobTitle');
const Interests = require('../models/interests');
const Language = require('../models/languages');

class HomeController {

    get(req, res) {
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

    addJobTitle = async (req, res) => {
        const {job} = req.body;
        try {
            await JobTitle.create(job, (err, docs) => {
                res.send(docs);
            })
        } catch (e) {
            console.log(e)
        }
    }

    addInterests = async (req, res) => {
        try {
            await Interests.create(req.body, (err, docs) => {
                res.send(docs);
            })
        } catch (e) {
            console.log(e)
            }
    }

    addLanguages = async (req, res) => {
        try {
            await Language.create(req.body, (err, docs) => {
                res.send(docs);
            })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new HomeController;
