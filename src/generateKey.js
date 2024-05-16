const fs = require('fs')
const path = require('path')
const { generateKeyPair } = require('crypto')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();
const secret = process.env.SECRET_KEY
const folderPath = path.resolve(`${__dirname}/jwt_keys`)

generateKeyPair(
    'rsa',
    {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: secret,
        },
    },
    (err, publicKey, privateKey) => {
        fs.writeFileSync(`${folderPath}/jwtRS256.key`, privateKey, error => {
            if (error) throw error;
        });
        fs.writeFileSync(`${folderPath}/jwtRS256.key.pub`, publicKey, error => {
            if (error) throw error;
        });
    },
);
