const jwt = require('jsonwebtoken');

function decodeJwtToken(req) {
    let jwtToken = req.cookies.jwt;

    if (!jwtToken) {

        // Get the Authorization header from the request
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            if (token) {
                jwtToken = token;
            }
        }
    }

    let finalDecodedToken = null;

    if (jwtToken) {
        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                throw new Error(err);
            }
            else {
                finalDecodedToken = decodedToken;
            }
        });
    }
    else {
        const error = new Error('Token not found');
        error.status = 401;
        error.message = 'Please login again';
        error.error = 'Token not found';
        throw error;
    }
    return finalDecodedToken;
}

module.exports = decodeJwtToken;