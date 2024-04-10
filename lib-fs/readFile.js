/* const fs = require('fs');

fs.readFile('./public/cities.json', 'utf-8', (err, data) =>{
    if(err){
        console.log(err+"Error al leer el archivo");
    }
    console.log(data);
}) */


const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/cities', (req, res) => {
    fs.readFile('./public/cities.json', 'utf-8', (err, data) =>{
        if(err){
            res.status(500).send({'status':'error', 'message': 'Error obtener informacion'});
            return
        }
        res.send(data)
    })  
})
module.exports = router;

