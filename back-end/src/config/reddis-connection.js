const Ioredis = require("ioredis");
const { redisHost, redisPort } = require("./env");

console.log(redisHost, redisPort)

const redis = new Ioredis({
    host: redisHost,
    port: redisPort,
    maxRetriesPerRequest: null
})

redis.monitor((err, monitor) => {
    if (err) throw err;
    console.log("Redis MONITOR mode started");

    monitor.on("monitor", (time, args, source, database) => {
        console.log(`[Redis Command]`, { time, args, source, database });
    });
});


redis.on("connect", () => {
    console.log("Connected to Redis");
});

redis.on("error", (error) => {
    console.error("Redis connection error:", error);
});

module.exports = { redis };