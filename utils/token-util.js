const jwt = require('jsonwebtoken');

function createToken(correo) {
    return jwt.sign(
        {correo},
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

function ensureTokenIsValid(token) {
    if (!token) {
        throw new Error('No se encuentra el token');
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createToken,
    ensureTokenIsValid
};
