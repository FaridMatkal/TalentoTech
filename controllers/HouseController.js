const HomeSchema = require('../models/House');

async function getHouses(req, res) {
    try {
        // Consultar todas las casas
        const houses = await HomeSchema.find();

        if (houses.length === 0) {
            // Si no se encontraron casas, enviar un mensaje de error
            return res.status(404).json({ message: 'No se encontraron casas.' });
        }

        // Si se encontraron casas, enviarlas como respuesta
        res.json(houses);
    } catch (error) {
        // Manejar errores de consulta u otros errores internos
        console.error('Error al consultar las casas:', error);
        res.status(500).json({ message: 'Ocurrió un error al consultar las casas. Por favor, inténtelo de nuevo más tarde.' });
    }
}

async function getHouseByCode(req, res) {
    try {
        // Obtener el código de la solicitud
        const code = req.params.code;

        //Traer una casa pasando el código
        const query = HomeSchema.where({ code: code });
        const house = await query.findOne()

        if (!house) {
            // Si no se encuentra la casa, enviar un mensaje de error
            return res.status(404).json({ message: 'Casa no encontrada.' });
        }
        // Si se encuentra la casa, enviarla como respuesta 
        res.json(house);
    } catch (error) {
        // Manejar errores de consulta u otros errores internos
        console.error('Error al buscar la casa:', error);
        res.status(500).json({ message: 'Ocurrió un error al buscar la casa. Por favor, inténtelo de nuevo más tarde.' });
    }
}

async function createHouse(req, res) {
    try {
        const existingHouse = await HomeSchema.findOne({ code: req.body.code });
        
        if (existingHouse) {
            return res.status(400).json({ status: 'error', message: 'The house with this code already exists.' });
        }

        const home = new HomeSchema({
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            size: req.body.size,
            type: req.body.type,
            zip_code: req.body.zip_code,
            rooms: req.body.rooms,
            bathrooms: req.body.bathrooms,
            parking: req.body.parking,
            price: req.body.price,
            code: req.body.code,
            image: req.body.image
        });

        const savedHouse = await home.save();
        res.status(201).json(savedHouse);
    } catch (error) {
        // Manejar errores
        console.error('Error creating house:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while creating the house. Please try again later.' });
    }
}

const uploadPhoto = async (req, res) => {
    try {
        const code = req.params.code;
        if (!req.file) {
            return res.status(400).send({ 'status': 'error', 'message': 'No se proporcionó ningún archivo' });
        }

        const imagePath = req.file.path;
        
        const updateHouse = {
            image: imagePath
        };

        const result = await HomeSchema.findOneAndUpdate({ code: code }, updateHouse, { new: true });
        
        if (!result) {
            return res.status(404).send({ 'status': 'error', 'message': 'No se encontró ninguna casa con este código' });
        }

        res.send({ "status": "success", "message": "Archivo subido correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "status": "error", "message": "Error actualizando el registro" });
    }
}


async function updateHouse(req, res) {
    console.log("llego a updateHouse");
    try {
        const code = req.params.code;

        // Verificar si el hogar existe antes de intentar actualizar
        const existingHome = await HomeSchema.findOne({ code: code });
        
        if (!existingHome) {
            return res.status(404).json({ status: 'error', message: 'Home not found.' });
        }

        const updateHome = {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            size: req.body.size,
            type: req.body.type,
            zip_code: req.body.zip_code,
            rooms: req.body.rooms,
            bathrooms: req.body.bathrooms,
            parking: req.body.parking,
            price: req.body.price,
            code: req.body.code,
            image: req.body.image
        }; 

        const updatedHome = await HomeSchema.findOneAndUpdate({ code: code }, updateHome, { new: true });
        
        res.status(200).json({ status: 'success', message: 'Home updated successfully.', updatedHome });
    } catch (error) {
        console.error('Error updating home:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while updating the home. Please try again later.' });
    }
}

async function deleteHouse(req, res) {
    try {
        const code = req.params.code; // Obtener el código de la solicitud
        console.log(code);

        // Eliminar la casa con el código especificado
        const result = await HomeSchema.deleteOne({ code: code });
        
        if (result.deletedCount === 0) {
            // Si no se elimina ninguna casa, enviar un mensaje de error
            return res.status(404).json({ message: 'Casa no encontrada o ya eliminada.' });
        }

        // Si se elimina la casa correctamente, enviar una respuesta exitosa
        res.json({ status: 'success', message: 'Casa eliminada exitosamente.' });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar la casa:', error);
        res.status(500).json({ status: 'failed', message: 'Ocurrió un error al eliminar la casa. Por favor, inténtelo de nuevo más tarde.' });
    }
}

module.exports = { getHouses, getHouseByCode,createHouse , updateHouse, deleteHouse,uploadPhoto };

