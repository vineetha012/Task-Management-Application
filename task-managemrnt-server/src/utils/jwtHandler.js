const jwt = require('jsonwebtoken');
const config = require('../config/index');


function generateToken({ user }) {
    const token = jwt.sign(user, config.JWT_SECRET, { expiresIn: '3h' });
    return token;
}

function verifyToken({ token }) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

module.exports = {
    generateToken,
    verifyToken
}