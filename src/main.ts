import { app } from "./app";
import * as http from "http";
import * as mongoose from "mongoose";
import { initRefs } from "./db/initDB";

const PORT = 8080;
const MONGO_URI = "mongodb://127.0.0.1:27017/ts";
const server = http.createServer(app);
server.listen(PORT);
server.on("listening", () => {
    console.info(`Listening on port ${PORT}.`);
    mongoose.connect(MONGO_URI, { useNewUrlParser: true});
    mongoose.connection.on("open", async () => {
        console.info("Connected to Mongo.");

        await initRefs();
    });
    mongoose.connection.on("error", err => {
        console.error(err);
    });
});