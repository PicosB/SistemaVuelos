const { ensureTokenIsValid } = require('../utils/token-util'); 

function autenticacion(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; 
    
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }
    
    try {
        const decoded = ensureTokenIsValid(token);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = autenticacion;
