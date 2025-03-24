import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');

export function createToken(correo) {
    return jwt.sign(
        { correo },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

export function ensureTokenIsValid(token) {
    if (!token) {
        throw new Error('No se encuentra el token');
    }
    jwt.verify(token, process.env.JWT_SECRET, { complete: true });
}

export default {
    createToken,
    ensureTokenIsValid
};
