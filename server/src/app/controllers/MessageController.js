const MessageThread = require("../models/messageThread");
const Message = require("../models/message");
const Member = require("../models/member");

class MessageController {

    getMessageThread = async (req, res) => {
        const {_id} = req.member;
        try {
            await MessageThread.find({
                    from: _id
                },
            )
                .populate("to")
                .sort({'updatedAt': -1})
                .exec( (err, docs) => {
                    if (!err) {
                        return res.json(docs)
                    }
                })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getMessages = (req, res) => {
        const {_id} = req.member;
        const {idTo} = req.body;
        try {
            let messages = Message.find({ $or:[ {from:_id, to: idTo}, {from:idTo, to: _id} ]}).populate('from');
            let toMember = Member.findById(idTo);
            return Promise.all([messages, toMember]).then(docs => {
                            return res.json({messages: docs[0], toMember: docs[1], me: _id})
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }
}

module.exports = new MessageController;