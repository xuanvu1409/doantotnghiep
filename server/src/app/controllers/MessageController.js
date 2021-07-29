const MessageThread = require("../models/messageThread");
const Message = require("../models/message");
const Member = require("../models/member");
const Relationship = require("../models/relationship");
const cloudinary = require('../../config/cloudinary');

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
                    },
                    {
                        $sort: {updatedAt: -1}
                    }
                ])
                const relationship = await Relationship.find({status: 2, $or: [{relatingId: _id}, {relatedId: _id}]}).populate('relatingId').populate('relatedId').sort('-updatedAt');
                return res.json({thread, relationship, me: _id});
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
                    },
                    {
                        $sort: {updatedAt: -1}
                    }
                ])
                const relationship = await Relationship.find({status: 2, $or: [{relatingId: _id}, {relatedId: _id}]}).populate('relatingId').populate('relatedId').sort('-updatedAt');
                return res.json({thread, relationship, me: _id});
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
        const {messageTo, content} = req.body;

        try {
            const urls = [];
            for (const file of req.files) {
                await cloudinary.uploader.upload(file.path, (err, res) => {
                    if (err) return res.status(500).send("Lỗi upload file");
                    urls.push({
                        srcImage: res.secure_url,
                        cloudinaryId: res.public_id
                    })
                })
            }
            const newMessage = await Message.create({
                to: messageTo,
                from: _id,
                content: content,
                media: urls,
                status: 1
            })
            if (!await MessageThread.exists({
                $or: [{from: _id, to: messageTo}, {from: messageTo, to: _id}]
            })) {
                await MessageThread.insertMany([{
                    to: messageTo,
                    from: _id,
                    status: 1,
                    lastMessage: content !== '' ? content : "Bạn đã gửi ảnh"
                }, {
                    from: messageTo,
                    to: _id,
                    status: 1,
                    lastMessage: content !== '' ? content : "Đã gửi ảnh cho bạn",
                    $inc: {notRead: 1}
                }])
                const message = await Message.findById(newMessage._id).populate('from');
                return res.json(message);
            } else {
                await MessageThread.findOneAndUpdate({to: _id, from: messageTo}, {
                    $inc: {notRead: 1},
                    lastMessage: content !== '' ? content : "Đã gửi ảnh cho bạn"
                })
                await MessageThread.findOneAndUpdate({from: _id, to: messageTo}, {
                    lastMessage: content !== '' ? content : "Bạn đã gửi ảnh", notRead: 0
                })
                const message = await Message.findById(newMessage._id).populate('from');
                return res.json(message);
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }
}

module.exports = new MessageController;