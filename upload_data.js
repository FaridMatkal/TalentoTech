require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); // Importa la librería mongoose para interactuar con MongoDB

// Obtiene la URL de la base de datos desde las variables de entorno o usa una cadena vacía si no está definida
const DB_URL = process.env.DB_URL || '';
mongoose.connect(DB_URL); // Establece la conexión a la base de datos

const UserSchema = require('./models/User'); // Importa el esquema del modelo de usuario

const xlsx = require('xlsx'); // Importa la librería para trabajar con archivos Excel

// Lee el archivo Excel y convierte su contenido en un objeto JavaScript
const workbook = xlsx.readFile('./public/datos_volcar.xlsx');
const sheet_list = workbook.SheetNames;
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_list[0]]);

// Recorre los datos y hashea las contraseñas antes de insertar en la base de datos
for (const user of data) {
    user.email = user.email.trim().toLowerCase(); // Elimina espacios en blanco al inicio y al final y convierte el email a minúsculas
    const hashedPassword = bcrypt.hashSync(user.password, 10); // Hash de la contraseña usando bcrypt
    user.password = hashedPassword; // Reemplaza la contraseña original por la hasheada
    UserSchema({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        id: user.id,
        password: user.password,
    }).save().then((result)=>{
        console.log("usuario subido:", user.name);
    }).catch((err)=>{
        console.log("Error al subir usuario", user.name);  
    })

}

/* 
// Inserta los datos en la base de datos usando el modelo UserSchema
UserSchema.insertMany(data).then(() => {
    console.log("Datos insertados correctamente"); // Muestra un mensaje si la inserción es exitosa
}).catch((err) => {
    console.error("Error al insertar los datos:", err); // Muestra un mensaje de error si la inserción falla
});
 */