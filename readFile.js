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
const path = require('path');


/* https://nodejs.org/api/path.html */
/* console.log(path.basename(path.dirname(__dirname))); */

router.get('/cities', (req, res) => {
    fs.readFile('./public/cities.json', 'utf-8', (err, data) =>{
        if(err){
            res.status(500).send({'status':'error', 'message': 'Error obtener informacion'});
            return
        }
        res.send(data)
    })  
})

router.post('/departaments',(req, res) =>{
    fs.readFile('./public/departaments.json', 'utf-8', (err, data) =>{
        let departaments = JSON.parse(data);
        departaments.push(req.body);
        fs.writeFile('./public/departaments.json', JSON.stringify(departaments), 'utf-8', (err) =>{
            if(err){
                res.send(err)
                return
            }
            res.send({'status':'success', 'message': 'Departamento agregado'});
        })
    })
})

module.exports = router;



