const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'app/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldName + '-' + Date.now());
    }
});

const upload = multer({
    storage: storage
})

module.exports = upload;