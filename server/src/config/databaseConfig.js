const mongoose = require('mongoose');
const DBConnectionError = require('../utils/errors/index');

const { MONGODB_URL } = require('./serverConfig');

const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Successfully connected to database.");
    } catch (error) {
        console.log("DB Error - ", error);
        throw new DBConnectionError(error);
    }
}

module.exports = {
    connectToMongo
};