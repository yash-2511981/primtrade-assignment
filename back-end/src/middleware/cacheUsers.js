const { redis } = require("../config/reddis-connection");
const { successResponse } = require("../utils/successResponse");

const cachedUsers = async (req, res, next) => {
    console.log("inside cache middleware")
    try {
        const data = await redis.get("users");

        if (data) {
            const parsed = JSON.parse(data);

            return successResponse(
                res,
                parsed,       // <--- CORRECT
                "Users fetched successfully from cache"
            );
        } else {
            console.log("failed to fetch cache")
        }

        return next();

    } catch (error) {
        console.log("Error while fetching data from redis", error.message);
        return next();
    }
};


module.exports = { cachedUsers }