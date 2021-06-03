const JobTitle = require('../models/jobTitle');
const Member = require('../models/member');
const Interests = require('../models/interests');
const Language = require('../models/languages');
const Image = require('../models/images');
const cloudinary = require('../../config/cloudinary');

class ProfileController {

    getMemberById = async (req, res) => {
        const {_id} = req.params;
        try {
            const member = await Member.findOne({_id})
                .select(["-password", "-isClose", "-createdAt", "-updatedAt"])
                .populate('interestsId')
                .populate('genderId')
                .populate('locationId')
                .populate('languageId');
            res.json(member);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getMemberByProfileId = async (req, res) => {
        const profileId = req.params.profileId;
        try {
            const member = await Member.findOne({profileId});
            if (!member) return res.status(404).json({message: "ID thành viên không tồn tại"});
            return res.json(member);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getJobTile = async (req, res) => {
        try {
            await JobTitle.find({}, (err, docs) => {
                res.json(docs);
            });

        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    updateWordAndEducation = async (req, res) => {
        let {_id, wordAndEducation} = req.body;
        try {
            const member = await Member.findOne({_id});
            if (!member) return res.status(404).json({message: "ID thành viên không tồn tại"});
            member.workAndEducation = wordAndEducation;
            member.save(function (err, doc) {
                if (!err) {
                    return res.json({message: "Cập nhật thành công", _id: doc._id});
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    uploadAvatar = async (req, res) => {
        const {_id} = req.body;
        try {
            await cloudinary.uploader
                .upload(req.file.path)
                .then(result => {
                    Member.findOneAndUpdate(_id, {
                        avatar: {
                            srcImage: result.secure_url,
                            cloudinaryId: result.public_id
                        }
                    }, (err) => {
                        if (!err) return res.json({message: "Cập nhật thành công", _id});
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    updateLocation = async (req, res) => {
        const {_id, locationId} = req.body;
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(404).json({message: "ID thành viên không tồn tại"});
            member.locationId = locationId;
            member.save((err, doc) => {
                if (!err) {
                    return res.json({message: "Cập nhật thành công", _id: doc._id});
                }
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getInterests = async (req, res) => {
        try {
            await Interests.find({}, (err, docs) => {
                res.json(docs);
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    updateInterests = async (req, res) => {
        const {_id, interests} = req.body;
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(404).json({message: "ID thành viên không tồn tại"});
            member.interestsId = interests;
            member.save((err, doc) => {
                if (!err) {
                    return res.json({message: "Cập nhật thành công", _id: doc._id});
                }
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getLanguage = async (req, res) => {
        try {
            await Language.find({}, (err, docs) => {
                res.json(docs);
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    updateLanguage = async (req, res) => {
        const {_id, language} = req.body;
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(404).json({message: "ID thành viên không tồn tại"});
            member.languageId = language;
            member.save((err, doc) => {
                if (!err) {
                    return res.json({message: "Cập nhật thành công", _id: doc._id});
                }
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    uploadImage = async (req, res) => {
        const {_id} = req.body;
        try {
            const urls = [];
            for (const file of req.files) {
                const newPath = await cloudinary.uploader.upload(file.path, (err, res) => {
                    if (err) return res.status(500).send("Lỗi upload file");
                })
                urls.push({
                    memberId: _id,
                    srcImage: newPath.secure_url,
                    cloudinaryId: newPath.public_id
                })
            }

            await Image.create(urls, (err, doc) => {
                if (err) {
                    return res.status(500).send("Lỗi thêm ảnh");
                }
                res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getGallery = async (req, res) => {
        const {_id} = req.params;
        try {
            await Image.find({memberId: _id}, (err, docs) => {
                res.json(docs);
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    removeImageById = async (req, res) => {
        const {_id} = req.params;
        try {
            const image = await Image.findById(_id);
            await cloudinary.uploader.destroy(image.cloudinaryId);
            image.remove();
            res.json({message: "Cập nhật thành công"});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }
}

module.exports = new ProfileController()