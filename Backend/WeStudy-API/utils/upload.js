var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars')
    },
    filename: (req, file, cb) => {
        //cb(null, Date.now() + '-' + file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
 
var upload = multer({ storage: storage });

module.exports = upload;