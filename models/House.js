const mongoose = require('mongoose');
const fetch = require('node-fetch');

// Definir el esquema
const HouseSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    validate:{
      validator: async function(city){
        let response = await fetch('https://api-colombia.com/api/v1/City');
        let cities = await response.json()
        return cities.some(object=> object.name.toUpperCase().includes(city.toUpperCase()));
      },
      message: props => `${props.value} no es un ciudad válido`
    }
  },
  state: {
    type: String,
    required: true,
    validate:{
      validator: async function(state){
        let response = await fetch('https://api-colombia.com/api/v1/Department');
        let departments = await response.json()
        return departments.some(department => department.name.toUpperCase().includes(state.toUpperCase()));
      },
      message: props => `${props.value} no es un departamento válido`
    }
  },
  size: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  parking: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // Expresión regular para validar el formato del código
        return /^[A-Z0-9]{8}$/i.test(value);
      },
      message: props => `${props.value} no es un código válido. Debe tener 8 caracteres alfanuméricos.`
    }
  },
  image: {
    type: String,
  
  }
});

// Crear y exportar el modelo
module.exports = mongoose.model('house', HouseSchema);
