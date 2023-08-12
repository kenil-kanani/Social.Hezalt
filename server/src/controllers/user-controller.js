const UserService = require('../services/user-service');

const userService = new UserService();

const createUser = async (req, res) => {
    try {
        const response = await userService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong in controller");
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password)
        return res.status(201).json({
            success: true,
            message: 'Successfully signIn',
            data: response,
            err: {}
        })
    } catch (error) {

        if (error.name == 'ValidationError') {
            return res.status(400).json({
                message: error.message,
                data: {},
                success: false,
                err: error
            })
        }
        console.log("Something went wrong in signIn Process", error);
        return res.status(error.statusCode).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const me = async (req,res) => {
    const userId = req.user.id;
    try {
        const response = await userService.me(userId)
        return res.status(201).json({
            success: true,
            message: 'User is fond from token id',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log("Controler Error - " , error)
        return res.status(error.statusCode).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const response = await userService.changePassword(req.body.email, req.body.oldPassword, req.body.newPassword);
        return res.status(201).json({
            success: true,
            message: 'Successfully change the password',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong in changing password Process", error);
        return res.status(error.statusCode).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}


const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is authenticated and token is valid'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const activateAccount = async (req, res) => {
    try {
        const token = req.query.token;
        console.log("Token :", token)
        const response = await userService.activateAccount(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is activated.'
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const isActivated = async (req, res) => {
    try {
        const token = req.query.token;
        const response = await userService.isActivated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is activated.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    createUser,
    signIn,
    isAuthenticated,
    activateAccount,
    changePassword,
    isActivated,
    me
}