const globalConstants = require('../const/globalConstants.js')
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const Authorization = req.header('Authorization');
    let token = null

    if(Authorization && Authorization.toLowerCase().startsWith('bearer')) token = Authorization.substring(7)

    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, globalConstants.SECRETWORD);

        req.userId = decoded.userId;

        if (decoded.expirationDate < new Date()) return res.status(401).json({ error: 'Token expirated' });

        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;