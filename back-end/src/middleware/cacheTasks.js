const { redis } = require('../config/reddis-connection');
const { successResponse } = require('../utils/successResponse');


const cacheTasks = async (req, res, next) => {
    const userId = req.user.id;
    const cacheKey = `user:${userId}`
    try {
        const data = await redis.get(cacheKey)

        if (data) {
            successResponse(res, JSON.parse(data), 'Users fetched successfully from cache');
        } else {
            req.cacheKey = cacheKey
            return next();
        }
    } catch (error) {
        console.log("Error while fetching data from redis", error.message)
        req.cacheKey = cacheKey
        next()
    }
};

module.exports = { cacheTasks };