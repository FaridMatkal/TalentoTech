const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){        
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {    
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error('El archivo no es una imagen'))
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter})

const uploadFile = (req, res, next) => {
    upload.single('file')(req, res, function (err) {
        if (err) {
            return res.status(400).send({ 'status': 'error', 'message': err.message });
        }
        next();
    });
}

module.exports = uploadFile;

