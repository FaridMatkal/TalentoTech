const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/departaments', async (req, res) => {
    try {
        let response = await fetch('https://api-colombia.com/api/v1/Department');
        let departments = await response.json();
        let content = JSON.stringify(departments);
        // Crear archivo en la ruta raiz del proyecto
        fs.writeFile('./public/departaments.json', content, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("El archivo fue creado correctamente");
        })

    } catch (error) {
        console.log('Error al actualizar datos');
        console.log(error);
    }
    fs.readFile('./public/departaments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send({ 'status': 'error', 'message': 'Error obtener informacion' });
            return
        }
        res.send(JSON.parse(data))
    })
})
module.exports = router;