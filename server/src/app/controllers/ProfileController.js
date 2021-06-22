const JobTitle = require('../models/jobTitle');
const Member = require('../models/member');
const Interests = require('../models/interests');
const Language = require('../models/language');
const Image = require('../models/image');
const cloudinary = require('../../config/cloudinary');
const bcrypt = require("bcrypt");
const Contact = require('../models/contact');
const moment = require('moment');

class ProfileController {

    getMemberById = async (req, res) => {
        const {_id} = req.member;
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
        const {profileId} = req.params;
        try {
            const member = await Member.findOne({profileId})
                .select(["-password", "-isClose", "-createdAt", "-updatedAt"])
                .populate('interestsId')
                .populate('genderId')
                .populate('locationId')
                .populate('languageId');
            let isMe = false;
            if (profileId === req.member.profileId) {
                isMe = true;
            }
            const contact = await Contact.find({memberId: member._id, isHide: false});
            const gallery = await Image.find(
                {memberId: member._id}, {}, {
                    sort: {
                        cloudinaryId: -1
                    }
                })
            res.json({member, isMe, contact, gallery});
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
        const {_id} = req.member;
        const {wordAndEducation} = req.body;
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
        const {_id} = req.member;
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(404).json({message: "ID thành viên không tồn tại"});
            if (member.avatar.cloudinaryId) {
                await cloudinary.uploader.destroy(member.avatar.cloudinaryId);
            }
            await cloudinary.uploader
                .upload(req.file.path)
                .then(result => {
                    member.avatar = {
                        srcImage: result.secure_url,
                        cloudinaryId: result.public_id
                    }
                    member.save((err, doc) => {
                        if (!err) {
                            return res.json({message: "Cập nhật thành công"});
                        }
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
        const {_id} = req.member;
        const {locationId} = req.body;
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(404).json({message: "ID thành viên không tồn tại"});
            member.locationId = locationId;
            member.save((err, doc) => {
                if (!err) {
                    return res.json({message: "Cập nhật thành công"});
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
        const {_id} = req.member;
        const {interests} = req.body;
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
        const {_id} = req.member;
        const {language} = req.body;
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
        const {_id} = req.member;
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

            await Image.create(urls, (err) => {
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

    removeImage = async (req, res) => {
        const {_id} = req.params;
        console.log(_id)
        try {
            const image = await Image.findById(_id);
            if (!image) return res.json({message: "Ảnh không tồn tại"})
            await cloudinary.uploader.destroy(image.cloudinaryId);
            image.remove();
            res.json({message: "Cập nhật thành công"});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    setAvatarbyId = async (req, res) => {
        const {_id} = req.params;
        try {
            const image = await Image.findById(_id);
            if (!image) return res.status(404).json({message: "Ảnh không tồn tại"})
            const member = await Member.findById(image.memberId);
            if (!member) return res.status(404).json({message: "Thành viên không tồn tại"})
            await cloudinary.uploader
                .upload(image.srcImage)
                .then(async (result) => {
                    if (member.avatar.cloudinaryId) {
                        await cloudinary.uploader.destroy(member.avatar.cloudinaryId);
                    }
                    member.avatar = {
                        srcImage: result.secure_url,
                        cloudinaryId: result.public_id
                    }
                    member.save(err => {
                        if (!err) return res.json({message: "Cập nhật thành công"});
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (e) {
            console.log(e);
            res.status(501).json({message: "Đã xảy ra sự cố"});
        }
    }

    changePass = async (req, res) => {
        const {_id} = req.member;
        const {currentPassword, newPassword} = req.body;

        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(400).json({message: "Thành viên không tồn tại"});
            const match = await bcrypt.compare(currentPassword, member.password);
            if (!match) {
                return res.status(400).json({message:"Mật khẩu không hợp lệ"});
            }
            member.password = await bcrypt.hash(newPassword, 15)
            member.save(err => {
                if (!err) return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    updateBasicInfo = async (req, res) => {
        const {_id} = req.member;
        const {name, dateOfBirth, genderId} = req.body;
        console.log(_id, name, dateOfBirth, genderId)
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(400).json({message: "Thành viên không tồn tại"});
            member.name = name;
            member.dateOfBirth = dateOfBirth;
            member.genderId = genderId;
            member.save(err => {
                if (!err) return res.json({message: "Cập nhật thành công", _id: member._id});
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    updateContact = async (req, res) => {
        const {_id} = req.member;
        try {
            await Contact.deleteMany({memberId: _id}, (err) => {
                if (err) {
                    return res.status(400).json({message: "Lỗi xóa liên hệ"});
                } else {
                    Contact.create(req.body, (err) => {
                        if (err) {
                            return res.status(400).json({message: "Lỗi tạo liên hệ"});
                        } else {
                            return res.json({message: "Cập nhật thành công"});
                        }
                    })
                }
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getContactByMemberId = async (req, res) => {
        const {_id} = req.member;
        try {
            await Contact.find({memberId: _id}, (err, docs) => {
                return res.json(docs)
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    changeStatusContact = async (req, res) => {
        const {_id} = req.params;
        const  {isHide} = req.body;
        try {
            const contact = await Contact.findById(_id);
            if (!contact) return res.status(404).json({message: "Liên hệ không tồn tại"});
            contact.isHide = isHide;
            contact.save(err => {
                if (!err) return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    delete = async (req, res) => {
        const {_id} = req.member;
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(404).json({mesage: "Thành viên không tồn tại"});
            member.deletedAt = moment().add(14, 'day');
            member.save(err => {
                if (!err) return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    updatePersonalInfo = async (req, res) => {
        const {_id} = req.member;
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(404).json({mesage: "Thành viên không tồn tại"});
            member.personalInfo = req.body;
            member.save(err => {
                if (!err) return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    getPersonalInfo = async (req, res) => {
        const {_id} = req.member;
        try {
            const member = await Member.findById(_id).select("personalInfo");
            if (!member) return res.status(404).json({mesage: "Thành viên không tồn tại"});
            return res.json(member.personalInfo);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }

    updateFilter = async (req, res) => {
        const {_id} = req.member;
        try {
            const member = await Member.findById(_id);
            if (!member) return res.status(404).json({mesage: "Thành viên không tồn tại"});
            member.filter = req.body;
            member.save(err => {
                if (!err) return res.json({message: "Cập nhật thành công"});
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Đã xảy ra sự cố"});
        }
    }
}

module.exports = new ProfileController()