const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_KEY, (error , user)=> {
            if(error) return res.status(500).json({
                message: 'Invalid Token!!!',
                data: {},
                success: false,
                err: error
            });
            req.user = user;
            next();
        });
    } else {
        return res.status(500).json({
            message: 'Invalid Token from middleware!!!',
            data: {},
            success: false,
        });
    }
};

module.exports = {
    authenticateJwt,
}