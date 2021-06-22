const Member = require('../models/member');
const moment = require('moment');
const Image = require('../models/image');
const Action = require('../models/actions');

class EncounterController {

    get = async (req, res) => {
        const {_id} = req.member;
        let images = [];
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(400).json({message: "Thành viên không tồn tại"});
            if (member.filter) {
                let genderId = member.filter.gender === "none" ? {$ne: null} : member.filter.gender;
                let locationId = member.filter.location.value === "none" ? {$ne: null} : member.filter.location.value;
                let age = {
                    min: moment().subtract(member.filter.age.max, "year").subtract(moment().month(), 'M'),
                    max: moment().subtract(member.filter.age.min, "year").add(moment().month(), 'M')
                };
                const newMember = await Member.findOne({
                    _id: {$nin: [...req.body, _id]},
                    genderId,
                    locationId,
                    dateOfBirth: {
                        $gte: age.min, $lte: age.max
                    }
                }).sort('view');
                if (newMember) {
                    newMember.view += 1;
                    newMember.save(async (err, doc) => {
                        if (doc) {
                            images = await Image.find({memberId: doc._id});
                        }
                        let liked = false;
                        if (await Action.exists({actionMember: doc._id, actionBy: _id, type: 1})) {
                            liked = true;
                        }
                        return res.json({member: doc, images, liked: liked});
                    })
                }
            } else {
                await Member.findOne({}, async (err, doc) => {
                    if (doc) {
                        images = await Image.find({memberId: doc._id});
                    }
                    return res.json({member: doc, images});
                })
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    like = async (req, res) => {
        const {_id} = req.member;
        const {memberId} = req.body;
        try {
            if (await Action.exists({actionMember: memberId, actionBy: _id})) {
                Action.remove({actionMember: memberId, actionBy: _id}, (err, doc) => {
                    if (!err) {
                        return res.json({message: 'Bỏ yêu thích thành công', action: doc});
                    }
                })
            } else {
                await Action.create({
                    actionMember: memberId,
                    actionBy: _id,
                    type: 1
                }, (err, doc) => {
                    if (!err) {
                        return res.json({message: 'Yêu thích thành công', action: doc});
                    }
                })
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

}

module.exports = new EncounterController;