const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
    constructor(errObj) {
        super();

        //! Build explanation array
        // Some logic

        this.name = errObj.name || 'ValidationError';
        this.message = errObj.message || 'Not able to validate the dataset sent in the request.';
        this.explanation = errObj.explanation || 'Sent the wrong data';
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;