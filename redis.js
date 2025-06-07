const configs = require("./configs");
const { Redis } = require("ioredis");


const redis = new Redis(configs.redis.uri);

const test = async () => {
    const keys = await redis.keys('*');

    console.log(keys);
    
}

test();


module.exports = redis;