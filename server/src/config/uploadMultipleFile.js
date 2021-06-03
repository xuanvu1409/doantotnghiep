const multer = require("multer");
const path = require("path");

// Multer config
const upload = multer({
    storage: multer.diskStorage({
        // destination: (req, file, callback) => {
        //     callback(null, path.join(__dirname, '../public/uploads/'))
        // },
        filename: (req, file, callback) => {
            callback(null, Date.now()+ "-" + file.originalname);
        }
    }),
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            callback(new Error("File type is not supported"), false);
            return;
        }
        if (file.size > 1024 * 1024) {
            callback(new Error("File is Too large"), false);
            return;
        }
        callback(null, true);
    },
});
module.exports = upload.array("image")