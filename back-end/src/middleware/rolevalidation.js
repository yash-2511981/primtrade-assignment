const isUserAllowed = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            throw new ApiError(403, "Access denied: insufficient permissions");
        }
    };
};

module.exports = { isUserAllowed };