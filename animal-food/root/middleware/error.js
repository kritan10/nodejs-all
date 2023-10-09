import ApiError from "../errors/ApiError.js"
import AuthenticationError from "../errors/AuthenticationError.js"

function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        if (err instanceof AuthenticationError) return res.json({ message: err.message })
    }
}

export default errorMiddleware