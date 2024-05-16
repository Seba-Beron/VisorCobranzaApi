const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { SECRET_KEY, TOKEN_TIME, ISSUER } = require('./const/globalConstants.js');

const folderPath = path.resolve(`${__dirname}/jwt_keys`);
const JWT_PRIVATE_KEY = fs.readFileSync(`${folderPath}/jwtRS256.key`, 'utf8')
const JWT_PUBLIC_KEY = fs.readFileSync(`${folderPath}/jwtRS256.key.pub`, 'utf8')

module.exports = {
    createToken: (rut, name) => {
        return jwt.sign(
            { rut: rut, username: name },
            { key: JWT_PRIVATE_KEY, passphrase: SECRET_KEY },
            { issuer: ISSUER, algorithm: "RS256", expiresIn: TOKEN_TIME }
        )
    },

    verifyToken: (token) => {
        return jwt.verify(
            token,
            JWT_PUBLIC_KEY,
            { issuer: ISSUER, algorithms: ['RS256'], maxAge: TOKEN_TIME },
            (err, decode) => {
                if (err) return { tokenExp: true, error: err }
                return { tokenExp: false, decode }
            },
        );
    }
}