import { StatusCodes } from "http-status-codes";

class ApiError extends Error {
    /**
     * 
     * @param {string} message 
     * @param {StatusCodes} statusCode 
     * @param  {...any} args 
     */
    
    constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, ...args) {
        super(message, ...args);
        this.message = message
        this.statusCode = statusCode
    }
}

export default ApiError