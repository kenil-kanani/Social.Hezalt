const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
    constructor(error) {
        super();

        //! Build explanation array
        // Some logic

        this.name = 'ValidationError';
        this.message = 'Not able to validate the dataset sent in the request.';
        this.explanation = 'Sent the wrong data';
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;