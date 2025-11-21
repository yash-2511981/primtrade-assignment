const z = require("zod");
const { ApiError } = require("../utils/ApiError");

const validateRequest = (zodSchema) => {
    return (req, res, next) => {
        console.log(req.body)
        try {
            const parsedData = zodSchema.parse(req.body)
            req.body = parsedData
            next()
        } catch (error) {
            let messge = null
            if (error instanceof z.ZodError) {
                messge = error.issues[0].message
            }
            next(new ApiError(400, messge || "Something is wrong"))
        }
    }
}

module.exports = { validateRequest }