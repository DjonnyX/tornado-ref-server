import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { logger } from "./utils/logger";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

export const AUTH_PRIVATE_KEY = process.env["AUTH_PRIVATE_KEY"];
export const AUTH_FORGOT_PRIVATE_KEY = process.env["AUTH_FORGOT_PRIVATE_KEY"];
export const DB_URI = process.env["DB_URI"];
export const PORT = Number.parseInt(process.env["PORT"]);
export const SWAGGER_ROUTE = process.env["SWAGGER_ROUTE"];
export const LOCALIZATION_TEMPLATE_PATH = path.normalize("translate/template.json");

if (!AUTH_PRIVATE_KEY) {
    logger.error("No client secret. Set AUTH_PRIVATE_KEY environment variable.");
    process.exit(1);
}

if (!AUTH_FORGOT_PRIVATE_KEY) {
    logger.error("No client secret. Set AUTH_FORGOT_PRIVATE_KEY environment variable.");
    process.exit(1);
}
