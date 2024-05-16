// ESTAN TODAS LAS CONSTANTES DE LA API EN ESTE ARCHIVO

require('dotenv').config() // importar dotenv para obtener las variables de entorno

module.exports = {
    PORT: process.env.PORT || 5000, // obtener el puerto de la aplicación desde el archivo .env o si no existe, usar el puerto 5000

    DB_PORT: process.env.DB_PORT,
    HOST: process.env.HOST,
    USER: process.env.USER,   
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,

    SECRET_KEY: process.env.SECRET_KEY,
    TOKEN_TIME: process.env.TOKEN_TIME,
    ISSUER: process.env.ISSUER
}