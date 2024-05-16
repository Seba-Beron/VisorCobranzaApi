const { verifyToken } = require('../utils.js')
const jwt = require('jsonwebtoken')

function verifyAuth(req, res, next) {

    const Authorization = req.header('Authorization');
    let token = null

    if(Authorization && Authorization.toLowerCase().startsWith('bearer')) token = Authorization.substring(7)

    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = verifyToken(token);

        if (decoded.tokenExp) return res.status(401).json({ error: 'Token expirated' });

        next();

    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyAuth;