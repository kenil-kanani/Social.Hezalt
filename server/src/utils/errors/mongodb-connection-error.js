const { StatusCodes } = require('http-status-codes');

class DBConnectionError extends Error {
    constructor(error) {
        super();
        this.name = 'DBConnectionError';
        this.message = 'Not able to connect to the database.';
        this.explanation = 'Database Server has been down...';
        this.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
    }
}

module.exports = DBConnectionError;