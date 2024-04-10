const fs = require('fs');

const content = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc id aliquet tincidunt, nisl nunc tincidunt nunc, id aliquet nunc nunc id aliquet. Sed euismod, nunc id aliquet tincidunt, nisl nunc tincidunt nunc, id aliquet nunc nunc id aliquet. Sed euismod, nunc id aliquet tincidunt, nisl nunc tincidunt nunc, id aliquet nunc nunc id aliquet. Sed euismod, nunc id aliquet tincidunt"


//Crear archivo en la ruta raiz del proyecto
fs.writeFile('./public/archivo.txt', content, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("El archivo fue creado correctamente");
})