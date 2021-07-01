const MessageThread = require("../models/messageThread");
const Message = require("../models/message");
const Member = require("../models/member");
const Relationship = require("../models/relationship");

class MessageController {

    getMessageThread = async (req, res) => {
        const {_id} = req.member;
        const {q} = req.query;
        try {
            if (q !== '') {
                const thread = await MessageThread.aggregate([
                    {
                        $match:{from: _id }
                    },
                    {
                        $lookup:{
                            from:'members',
                            localField:"to",
                            foreignField:'_id',
                            as:'member'
                        }
                    },
                    {
                        $unwind:'$member'
                    },
                    {
                        $match:{
                            'member.name':{ $regex: '.*' + q + '.*' }
                        }
                    }
                ])
                const member = await Member.find({_id: {$ne: _id}});
                return res.json({thread, member});
            } else {
                const thread = await MessageThread.aggregate([
                    {
                        $match:{from: _id }
                    },
                    {
                        $lookup:{
                            from:'members',
                            localField:"to",
                            foreignField:'_id',
                            as:'member'
                        }
                    },
                    {
                        $unwind:'$member'
                    }
                ])
                const member = await Member.find({_id: {$ne: _id}});
                return res.json({thread, member});
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getMessages = async (req, res) => {
        const {_id} = req.member;
        const {idTo, limit} = req.query;
        try {
            if (await Relationship.exists({$or: [{relatingId: idTo, relatedId: _id}, {relatingId: _id, relatedId: idTo}]})) {
                await Message.updateMany({to: _id, from: idTo}, {$set: {status: 2}});
                let messages = await Message.find({ $or:[ {from:_id, to: idTo}, {from:idTo, to: _id} ]}).populate('from');
                let toMember = await Member.findById(idTo);
                return res.json({messages, toMember, me: _id})
            } else {
                let toMember = await Member.findById(idTo);
                await Message.updateMany({to: _id, from: idTo}, {$set: {status: 2}});
                let messages = await Message.find({ $or:[ {from:_id, to: idTo}, {from:idTo, to: _id} ]}).populate('from');
                return res.status(403).json({toMember, messages, me: _id})
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }


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
                    status: 1
                })
            }
            if (!threadFrom) {
                await MessageThread.create({
                    to: messageTo,
                    from: _id,
                    status: 1
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
            } else {
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
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }
}

module.exports = new MessageController;