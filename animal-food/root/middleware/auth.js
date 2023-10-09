import AuthenticationError from "../errors/AuthenticationError.js"

export const authMiddleware = (req, res, next) => {
    try {
        if (req.user === undefined || req.user === null) {
            throw new AuthenticationError("Unauthenticated. Cannot access this route.")
        }
        return next()
    } catch (error) {
        return next(error)
    }
}