const UserRepository = require('../repository/user-repository');
const sendMail = require('../utils/send-mail');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const { ServiceError, ValidationError } = require('../utils/errors/index');
const { encryptedPassword } = require('../utils/encryptPassword');
const { StatusCodes } = require('http-status-codes');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userDetail) {
        try {
            const user = await this.userRepository.createUser(
                {
                    ...userDetail,
                    status: false
                });
            const newJWT = this.createToken({ id: user._id }, '1d');
            //- send token in mail or any other medium
            await sendMail(user.email, newJWT);
            return newJWT;
        } catch (error) {
            if (error.name == 'RepositoryError') {
                throw error;
            }
            throw new ServiceError();
        }
    }

    async signIn(email, plainPassword) {
        try {
            //- step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //- step 2-> compare incoming plain password with stores encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if (!passwordsMatch) {
                throw new ValidationError(
                    {
                        message: 'Incorect password',
                        explanation: 'password not match , try again later'
                    }
                );
            }
            if (!user.status) {
                throw new ValidationError(
                    {
                        message: 'User is not verified',
                        explanation: 'click on the link recieved on mail to verify'
                    }
                );
            }
            //- step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({ email: user.email, id: user._id }, '1d');
            return newJWT;
        } catch (error) {
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw new ValidationError(
                    {
                        message: 'Not able to verify token'
                    }
                )
            }
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw new ValidationError({
                    message: 'User not exist'
                })
            }
            return user._id;
        } catch (error) {
            if (error.name == 'RepositoryError') {
                throw error;
            }
            throw new ServiceError();
        }
    }

    async activateAccount(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw new ValidationError(
                    {
                        message: 'Invalid Token'
                    }
                )
            }
            //- update isActivated to true and save it into database
            const user = await this.userRepository.activeAccount(response.id);
            return user.status;
        } catch (error) {
            if (error.name == 'RepositoryError') {
                throw error;
            }
            throw new ServiceError();
        }
    }

    async changePassword(userEmail, oldPassword, newPassword) {
        try {
            //- step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(userEmail);
            //- step 2-> compare incoming plain password with stores encrypted password
            const passwordsMatch = this.checkPassword(oldPassword, user.password);

            if (!passwordsMatch) {
                throw new ValidationError(
                    {
                        message: 'Password does not match',
                        explanation: 'password not match , try again later'
                    }
                );
            }
            //! User not able to change password without has been verified user.
            if (!user.status) {
                throw new ValidationError(
                    {
                        message: 'User is not verified',
                        explanation: 'click on the link recieved on mail to verify'
                    }
                );
            }
            //! Encrypte the new Password
            const encryptedPass = encryptedPassword(newPassword);

            return await this.userRepository.updatePassword(user._id, encryptedPass);
        } catch (error) {
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }
    }

    createToken(user, expTime) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: expTime });
            return result;
        } catch (error) {
            throw ServiceError({
                message: 'Not able to create token',
                explanation: 'Not able to create token , try againg later',
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR
            });
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            throw ServiceError({
                message: 'Not able to verify token',
                explanation: 'Not able to verify token , try againg later',
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR
            });
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            throw ServiceError({
                message: 'Not able to check password',
                explanation: 'Not able to check password , try againg later',
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR
            });
        }
    }
}

module.exports = UserService;