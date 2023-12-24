const Redis = require("ioredis");
const redis = new Redis({
  port: 15105, // Redis port
  host: "redis-15105.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASS || "3YplbzuHH7LwcGLWUnTDgfSvDitE2PPv",
  db: 0, // Defaults to 0
});

module.exports = redis;
