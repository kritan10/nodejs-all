import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError.js";

class AuthenticationError extends ApiError {
    constructor(message, ...args) {
        const statusCode = StatusCodes.UNAUTHORIZED
        super(message, statusCode, ...args);
        this.message = message
    }
}

export default AuthenticationError