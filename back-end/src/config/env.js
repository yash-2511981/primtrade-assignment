require('dotenv').config();

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URL;
const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;
const jwtSecret = process.env.JWT_SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL;


module.exports = { port, redisPort, redisHost, jwtSecret, adminPassword, adminEmail, mongoURI };