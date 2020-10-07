import { app } from "./app";
import * as https from "https";
import * as fs from "fs";

import * as mongoose from "mongoose";
import { initRefs } from "./db/initDB";
import * as config from "./config";

const PORT = config.PORT;
const MONGO_URI = `${config.DB_URI}/${config.DB_NAME}`;

const httpsOptions = {
    key: fs.readFileSync("keystore/key.pem"),
    cert: fs.readFileSync("keystore/cert.pem")
};

const server = https.createServer(httpsOptions, app);
server.listen(PORT);
server.on("listening", () => {
    console.info(`Listening on port ${PORT}.`);
    mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    mongoose.connection.on("open", async () => {
        console.info("Connected to Mongo.");

        await initRefs();
    });
    mongoose.connection.on("error", err => {
        console.error(err);
    });
});