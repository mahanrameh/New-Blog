const app = require("./app");
const configs = require("./configs");
const redis = require("./redis");
const {db} = require("./db");



async function startServer() {
    try {
        await db.authenticate();
        await redis.ping();

        app.listen(configs.port, () => {
            console.log(`listening on port ${configs.port}`);
            
        });
    } catch (err) {
        console.log('Error ---->', err);


        await db.close();
        await redis.disconnect();
    }
}



startServer();