import * as express from "express";
import * as cors from "cors";
import * as bodyparser from "body-parser";
import { requestLoggerMiddleware } from "./middlewares/requestLoggerMiddleware";
import { RegisterRoutes } from "./routes";
import * as swaggerUI from "swagger-ui-express";
import * as config from "./config";

const app = express();
app.use("/assets", express.static("assets"));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, x-www-form-urlencoded, X-Requested-With, Content-Type, Accept, Authorization, x-access-token",
    );
    
    next();
});
app.use(cors());
app.use(bodyparser({
    limit: "50mb",
    extended: true,
}));

if (process.env.NODE_ENV !== "production") {
    app.use(requestLoggerMiddleware);
    RegisterRoutes(app);
}

try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const swaggerDocument = require("../swagger.json");
    app.use(config.SWAGGER_ROUTE, swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (err) {
    console.error("Unable to read swagger.json", err);
}

export { app };