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
export const AUTH_CLIENT_PRIVATE_KEY = process.env["AUTH_CLIENT_PRIVATE_KEY"];
export const DB_NAME = process.env["DB_NAME"];
export const DB_URI = process.env["DB_URI"];
export const PORT = Number.parseInt(process.env["PORT"]);
export const SWAGGER_ROUTE = process.env["SWAGGER_ROUTE"];
export const LOCALIZATION_TEMPLATE_PATH = path.normalize("template/localization.json");
export const CURRENCY_TEMPLATE_PATH = path.normalize("template/currency.json");
export const LIC_SERVER_HOST = process.env["LIC_SERVER_HOST"];
export const AUTH_LIC_SERVER_API_KEY = process.env["AUTH_LIC_SERVER_API_KEY"];

if (!AUTH_PRIVATE_KEY) {
    logger.error("No client secret. Set AUTH_PRIVATE_KEY environment variable.");
    process.exit(1);
}

if (!AUTH_FORGOT_PRIVATE_KEY) {
    logger.error("No client secret. Set AUTH_FORGOT_PRIVATE_KEY environment variable.");
    process.exit(1);
}
