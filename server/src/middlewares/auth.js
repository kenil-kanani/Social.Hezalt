const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const { StatusCodes } = require('http-status-codes');


const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (token != "null") {
        jwt.verify(token, JWT_KEY, (error , user)=> {
            if(error) {
                console.log("In Middelware error - " , error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Invalid Token!!!',
                    data: {},
                    success: false,
                    err: error
                });
            }
            console.log("User - " , user)
            req.user = user;
            next();
        });
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Invalid Token from middleware!!!',
            data: {},
            success: false,
        });
    }
};

module.exports = {
    authenticateJwt,
}