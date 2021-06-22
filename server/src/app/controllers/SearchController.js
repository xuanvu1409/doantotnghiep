const Member = require('../models/member');
const moment = require('moment');

class SearchController {
    get = async (req, res) => {
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
                await Member.find({
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
                        skip: Number((page - 1) * Number(limit))
                    },
                    (err, docs) => {
                        return res.json(docs);
                    })
            } else {
                await Member.find({}, (err, docs) => {
                    return res.json(docs)
                })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }
}

module.exports = new SearchController;