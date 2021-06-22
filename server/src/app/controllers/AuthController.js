const Member = require('../models/member');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ramdom = require("../helper/random");
const moment = require('moment');

class AuthController {

    register = async (req, res) => {
        const {name, email, locationId, password, dateOfBirth, genderId} = req.body;
        try {
            const oldMember = await Member.findOne({email: email});
            if (oldMember) return res.status(400).json({message: "Email đã tồn tại"});

            const member = await Member.create({
                profileId: ramdom.randomString(),
                name: name,
                email: email,
                locationId: locationId,
                password: await bcrypt.hash(password, 15),
                dateOfBirth: dateOfBirth,
                genderId: genderId,
                avatar: {
                    srcImage: 'https://res.cloudinary.com/xuanvu/image/upload/v1622666322/placeholder_rltzqh.png'
                }
            })
            const token = await jwt.sign({profileId: member.profileId, _id: member._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
            return res.status(200).json({
                message: "Đăng ký tài khoản thành công",
                member,
                token
            });
        } catch (error) {
            res.status(500).json({message: "Đã xảy ra sự cố"});
            console.log(error);
        }
    }

    login = async (req, res) => {
        const {email, password} = req.body;

        try {
            const oldMember = await Member.findOne({email});
            if (!oldMember) return res.status(401).json({message: "Email không tồn tại"});
            const isPasswordCorrect = await bcrypt.compare(password, oldMember.password);
            if (!isPasswordCorrect) return res.status(400).json({message: "Mật khẩu không hợp lệ"});
            if (oldMember.deletedAt) {
                if (moment() >= moment(oldMember.deletedAt)) {
                    return res.status(401).json({message: "Tài khoản đã bị xóa"});
                } else {
                    oldMember.deletedAt = null;
                    oldMember.save();
                }
            }
            const token = await jwt.sign({profileId: oldMember.profileId, _id: oldMember._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
            return res.status(200).json({
                member: oldMember,
                message: "Đăng nhập thành công",
                token
            });
        } catch (error) {
            res.status(500).json({message: "Đã xảy ra sự cố"});
            console.log(error);
        }
    }
}

module.exports = new AuthController;

