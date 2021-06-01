const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/uploads/'));
    },
    filename: (req, file, callback) => {
        callback(null, Date.now()+ "-" + file.originalname);
    }
})

const fileFilter = (req, file, callback) => {
    callback(null, true);
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload.single('memberAvatar');