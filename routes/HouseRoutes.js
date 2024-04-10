const express = require('express');
const router = express.Router();
const HouseSchema = require('../models/House');
const houseController = require('../controllers/HouseController');
const uploadFile = require('../utils/fileUpload');
const multer = require('multer');



router.get('/house', houseController.getHouses);
router.get('/house/:code', houseController.getHouseByCode);
router.post('/house', houseController.createHouse);
router.patch('/house/:code', houseController.updateHouse);
router.delete('/house/:code', houseController.deleteHouse);
//router.patch('/upload/:code/house', uploadFile, houseController.uploadPhoto);


//Configuracion de la libreria multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('El archivo no es una imagen'))
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

// Servicio web para el almacenamiento de archivos
router.patch('/upload/:code/house', upload.single('file'), (req, res) => {
    var code = req.params.code;
    if (!req.file) {
        return res.status(400).send({ 'status': 'error', 'message': 'No se proporcionó ningún archivo' });
    }

    var updateHouse = {
        image: req.file.path
    };

    HouseSchema.findOneAndUpdate({ code: code }, updateHouse, { new: true }).then((result) => {
        if (!result) {
            return res.status(404).send({ 'status': 'error', 'message': 'No se encontró ninguna casa con este código' });
        }
        res.send({ "status": "success", "message": "Archivo subido correctamente" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ "status": "error", "message": "Error actualizando el registro" });
    });
});


module.exports = router;

