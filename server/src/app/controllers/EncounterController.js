const Member = require('../models/member');
const moment = require('moment');
const Image = require('../models/image');
const Action = require('../models/action');
const Relationship = require('../models/relationship');
const Message = require('../models/message');
const MessageThread = require('../models/messageThread');

//Action
//(type:1) Thích
//(type:2) Danh sách yêu thích

//Relationship
//(type:1) Gửi lời mời
//(type:2) Đồng ý

class EncounterController {

    sendMessage = async (req, res) => {
        const {_id} = req.member;
        const {messageTo, content, media} = req.body;
        try {
            const threadFrom = await MessageThread.findOne({to: messageTo, from: _id, status: 1});
            const threadTo = await MessageThread.findOne({to: _id, from: messageTo, status: 1});
            if (!threadTo) {
                await MessageThread.create({
                    to: _id,
                    from: messageTo,
                    status: 1,
                    lastMessage: content
                })
            }
            if (!threadFrom) {
                await MessageThread.create({
                    to: messageTo,
                    from: _id,
                    status: 1,
                    lastMessage: content
                }, async (err) => {
                    if (!err) {
                        await Message.create({
                            to: messageTo,
                            from: _id,
                            content: content,
                            media: media,
                            status: 1
                        }, (err) => {
                            if (!err) {
                                return res.json({message: "Cập nhật thành công"});
                            }
                            console.log(err)
                        })
                    }
                })
            }
            await Message.create({
                to: messageTo,
                from: _id,
                content: content,
                media: media,
                status: 1
            })
            await MessageThread.updateMany({
                $or: [{from: _id, to: messageTo}, {from: messageTo, to: _id}]
            }, {
                $set: {updatedAt: moment(), lastMessage: content}
            }, (err, doc) => {
                return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    get = async (req, res) => {
        const {_id} = req.member;
        const {memberId} = req.body;
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
                    _id: {$nin: [memberId, _id]},
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
                            let liked = await Action.exists({actionMember: doc._id, actionBy: _id, type: 1})
                            let favorited = await Action.exists({actionMember: doc._id, actionBy: _id, type: 2})
                            let relationship = await Relationship.exists({
                                $or: [{
                                    relatingId: _id,
                                    relatedId: doc._id
                                }, {relatedId: _id, relatingId: doc._id}]
                            });
                            let relationshiped = await Relationship.exists({relatingId: _id, relatedId: doc._id});
                            return res.json({
                                member: doc,
                                images,
                                liked,
                                favorited,
                                relationship,
                                relationshiped
                            });
                        }
                    })
                }
            } else {
                const newMember = await Member.findOne({
                    _id: {$nin: [memberId, _id]}
                }).sort('view');
                if (newMember) {
                    newMember.view += 1;
                    newMember.save(async (err, doc) => {
                        images = await Image.find({memberId: doc._id});
                        let liked = await Action.exists({actionMember: doc._id, actionBy: _id, type: 1})
                        let favorited = await Action.exists({actionMember: doc._id, actionBy: _id, type: 2})
                        let relationship = await Relationship.exists({
                            $or: [{
                                relatingId: _id,
                                relatedId: doc._id
                            }, {relatedId: _id, relatingId: doc._id}]
                        });
                        let relationshiped = await Relationship.exists({relatingId: _id, relatedId: doc._id});
                        return res.json({
                            member: doc,
                            images,
                            liked,
                            favorited,
                            relationship,
                            relationshiped
                        });
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
                Action.remove({actionMember: memberId, actionBy: _id, type: 1}, async (err, doc) => {
                    if (!err) {
                        const countLike = await Action.countDocuments({type: 1, actionMember: memberId});
                        await Member.findByIdAndUpdate(memberId, {like: countLike});
                        return res.json({message: 'Cập nhật thành công'});
                    }
                })
            } else {
                await Action.create({
                    actionMember: memberId,
                    actionBy: _id,
                    type: 1
                }, async (err, doc) => {
                    if (!err) {
                        const countLike = await Action.countDocuments({type: 1, actionMember: memberId});
                        await Member.findByIdAndUpdate(memberId, {like: countLike});
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
        try {
            if (await Relationship.exists({
                    status: 1,
                    $or: [{relatingId: memberId, relatedId: _id}, {relatingId: _id, relatedId: memberId}]
                })) {

                await Relationship.remove({
                    status: 1,
                    $or: [{relatingId: memberId, relatedId: _id}, {relatingId: _id, relatedId: memberId}]
                }, (err, doc) => {
                    return res.json({message: 'Cập nhật thành công'});
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

    getAction = (req, res) => {
        const {_id} = req.member;
        const {memberId} = req.query;

        const like = Action.exists({actionBy: _id, actionMember: memberId, type: 1});
        const favorite = Action.exists({actionBy: _id, actionMember: memberId, type: 2});
        const relationship = Relationship.exists({
            $or: [{relatingId: _id, relatedId: memberId}, {
                relatedId: _id,
                relatingId: memberId
            }]
        });
        const relationshiped = Relationship.exists({relatingId: _id, relatedId: memberId});
        Promise.all([like, favorite, relationship, relationshiped]).then(result => {
            return res.json({like: result[0], favorite: result[1], relationship: result[2], relationshiped: result[3]})
        })
    }

    search = async (req, res) => {
        const {_id} = req.member;
        const {page, limit} = req.query;

        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(400).json({message: "Thành viên không tồn tại"});
            if (member.filter) {
                let genderId = member.filter.gender === "none" ? {$ne: null} : member.filter.gender;
                let locationId = member.filter.location.value === "none" ? {$ne: null} : member.filter.location.value;
                let age = {
                    min: moment().subtract(member.filter.age.max, "year"),
                    max: moment().subtract(member.filter.age.min, "year")
                };
                const totalRows = await Member.countDocuments({
                    _id: {$ne: _id},
                    genderId,
                    locationId,
                    dateOfBirth: {
                        $gte: age.min, $lte: age.max
                    }
                })
                const members = await Member.find({
                        _id: {$ne: _id},
                        genderId,
                        locationId,
                        dateOfBirth: {
                            $gte: age.min, $lte: age.max
                        }
                    },
                    {},
                    {
                        limit: Number(limit),
                        skip: Number((page - 1) * Number(limit)),
                        sort: '-updatedAt'
                    })
                return res.json({members, totalRows});
            } else {
                const members = await Member.find({}, {}, {
                    limit: Number(limit),
                    skip: Number((page - 1) * Number(limit))
                })
                const totalRows = await Member.countDocuments({});
                return res.json({members, totalRows});
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getMatched = async (req, res) => {
        const {_id} = req.member;
        const {page, limit} = req.query;
        try {
            const totalRows = await Relationship.countDocuments({
                status: 2,
                $or: [{relatingId: _id}, {relatedId: _id}]
            });
            const matched = await Relationship.find({status: 2, $or: [{relatingId: _id}, {relatedId: _id}]}, {}, {
                limit: Number(limit),
                skip: Number((page - 1) * Number(limit))
            }).populate('relatingId').populate('relatedId').sort('-updatedAt');
            return res.json({matched, sender: _id, totalRows})
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getMatchedRequest = async (req, res) => {
        const {_id} = req.member;
        const {page, limit} = req.query;
        try {
            const totalRows = await Relationship.countDocuments({status: 1, relatingId: _id});
            const matchedRequest = await Relationship.find({status: 1, relatingId: _id}, {}, {
                limit: Number(limit),
                skip: Number((page - 1) * Number(limit))
            }).populate('relatedId').sort('-updatedAt');
            return res.json({matchedRequest, totalRows})
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    removeMatched = async (req, res) => {
        const {id} = req.params;
        try {
            await Relationship.findByIdAndDelete(id, (err, doc) => {
                return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    confirmMatched = async (req, res) => {
        const {id} = req.params;
        try {
            await Relationship.findByIdAndUpdate(id, {status: 2}, (err, doc) => {
                return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getFavoriteYou = async (req, res) => {
        const {_id} = req.member;
        const {page, limit} = req.query;
        try {
            const favoritedYou = await Action.find({type: 2, actionMember: _id}, {}, {
                limit: Number(limit),
                skip: Number((page - 1) * Number(limit))
            }).populate('actionBy').sort('-updatedAt');
            const totalRows = await Action.countDocuments({type: 2, actionMember: _id})
            return res.json({favoritedYou, totalRows});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getYourFavorites = async (req, res) => {
        const {_id} = req.member;
        const {page, limit} = req.query;
        try {
            const yourFavorites = await Action.find({type: 2, actionBy: _id}, {}, {
                limit: Number(limit),
                skip: Number((page - 1) * Number(limit))
            }).populate('actionMember').sort('-updatedAt');
            const totalRows = await Action.countDocuments({type: 2, actionBy: _id});
            return res.json({yourFavorites, totalRows});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    removeFavorite = async (req, res) => {
        const {id} = req.params;
        try {
            await Action.findByIdAndDelete(id, (err, doc) => {
                return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }

    }

}

module.exports = new EncounterController;