const Member = require('../models/member');
const moment = require('moment');
const Image = require('../models/image');
const Action = require('../models/actions');
const Relationship = require('../models/relationship');

//Action
//(type:1) Thích
//(type:2) Danh sách yêu thích

//Relationship
//(type:1) Gửi lời mời
//(type:2) Đồng ý

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
                        let favorited = false;
                        if (await Action.exists({actionMember: doc._id, actionBy: _id, type: 2})) {
                            favorited = true;
                        }
                        let status = 0;
                        let relationship = await Relationship.findOne({relatingId: doc._id, relatedId: _id});
                        if (relationship) {
                            status = relationship.status;
                        }
                        return res.json({member: doc, images, liked: liked, favorited, relationship: status});
                    })
                }
            } else {
                const newMember = await Member.findOne({
                    _id: {$nin: [...req.body, _id]}
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
                        let favorited = false;
                        if (await Action.exists({actionMember: doc._id, actionBy: _id, type: 2})) {
                            favorited = true;
                        }
                        let status = 0;
                        let relationship = await Relationship.findOne({relatingId: doc._id, relatedId: _id});
                        if (relationship) {
                            status = relationship.status;
                        }
                        return res.json({member: doc, images, liked: liked, favorited, relationship: status});
                    })
                }
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
            if (await Action.exists({actionMember: memberId, actionBy: _id, type: 1})) {
                Action.remove({actionMember: memberId, actionBy: _id, type: 1}, (err, doc) => {
                    if (!err) {
                        return res.json({message: 'Cập nhật thành công'});
                    }
                })
            } else {
                await Action.create({
                    actionMember: memberId,
                    actionBy: _id,
                    type: 1
                }, (err, doc) => {
                    if (!err) {
                        return res.json({message: 'Cập nhật thành công'});
                    }
                })
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    favorite = async (req, res) => {
        const {_id} = req.member;
        const {memberId} = req.body;
        try {
            if (await Action.exists({actionMember: memberId, actionBy: _id, type: 2})) {
                await Action.remove({actionMember: memberId, actionBy: _id, type: 2}, (err, doc) => {
                    if (!err) {
                        return res.json({message: 'Đã xóa khỏi danh sách yêu thích'});
                    }
                })
            } else {
                await Action.create({
                    actionMember: memberId,
                    actionBy: _id,
                    type: 2
                }, (err, doc) => {
                    if (!err) {
                        return res.json({message: 'Đã thêm vào danh sách yêu thích'});
                    }
                })
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    sendCrush = async (req, res) => {
        const {_id} = req.member;
        const {memberId, content} = req.body;
        console.log(req.body)
        try {
            if (await Relationship.exists({relatingId: memberId, relatedId: _id})) {
                await Relationship.remove({relatingId: memberId, relatedId: _id}, (err, doc) => {
                    if (!err) {
                        return res.json({message: 'Đã xóa khỏi danh sách kết đôi'});
                    }
                })
            } else {
                await Relationship.create({
                    relatingId: memberId,
                    relatedId: _id,
                    status: 1,
                    content: content
                }, (err, doc) => {
                    if (!err) {
                        return res.json({message: 'Đã gửi lời tỏ tình'});
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