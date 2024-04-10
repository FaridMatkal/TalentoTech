#Seleccionar imagen base y crear contenedor
FROM node:20-alpine

#Espacio de trabajo
WORKDIR /app

#Copiar archivos de package.json y package-lock.json
COPY package*.json ./

#Instalar dependencias
RUN npm install

#Copiar archivos de nuestro proyecto
COPY . ./

#Ejecutar comando de nuestro proyecto
CMD [ "npm", "start" ]