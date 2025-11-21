const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        message,
        data
    });
}

module.exports = { successResponse };