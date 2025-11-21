const { ApiError } = require("../utils/ApiError")
const { verifyToken } = require("../utils/jwt")

const authenticationMiddleware = async (req, res, next) => {
    const { jwt } = req.cookies;

    if (!jwt) {
        throw new ApiError(401, "Authentication required")
    }

    const data = await verifyToken(jwt)
    if (!data) {
        throw new ApiError(401, "Invalid token")
    }
    req.user = data;
    next();
}

module.exports = { authenticationMiddleware };