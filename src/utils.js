const jwt = require('jsonwebtoken')
const globalConstants = require('./const/globalConstants.js')

module.exports = {
    createToken: (rut, name) => {
        var fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() + 1);

        const userForToken = {
            rut: rut,
            username: name,
            expirationDate: fechaActual
        }

        return jwt.sign(userForToken, globalConstants.ACCESS_TOKEN_PRIVATE_KEY, { algorithm: "RS256", expiresIn: "1h" })
        // expiresIn -> https://github.com/vercel/ms
    }
}