const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');

const encryptedPassword = (simplePassword) => {
    const encryptedPassword = bcrypt.hashSync(simplePassword, SALT);
    return encryptedPassword;
}

module.exports = {
    encryptedPassword
}