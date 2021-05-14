import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { logger } from "./utils/logger";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

export const AUTH_PRIVATE_KEY = process.env["AUTH_PRIVATE_KEY"];
export const DB_URI = process.env["DB_URI"];
export const PORT = Number.parseInt(process.env["PORT"]);
export const CLIENT_HOST = process.env["CLIENT_HOST"];
export const SWAGGER_ROUTE = process.env["SWAGGER_ROUTE"];
export const LOCALIZATION_TEMPLATE_PATH = path.normalize("template/localization.json");
export const DEFAULT_INTRO_TEMPLATE_DATA_PATH = path.normalize("template/ads/intro/screensaver.mp4");
export const DEFAULT_INTRO_TEMPLATE_MANIFEST_PATH = path.normalize("template/ads/intro/manifest.json");
export const DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_DATA_PATH = path.normalize("template/ads/serviceUnavailable/screensaver.mp4");
export const DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_MANIFEST_PATH = path.normalize("template/ads/serviceUnavailable/manifest.json");
export const CURRENCY_TEMPLATE_PATH = path.normalize("template/currency.json");
export const THEMES_KIOSK_TEMPLATE_PATH = path.normalize("template/themes/kiosk.json");
export const THEMES_ORDER_PICKER_TEMPLATE_PATH = path.normalize("template/themes/order-picker.json");
export const THEMES_EQ_TEMPLATE_PATH = path.normalize("template/themes/eq.json");
export const LIC_SERVER_HOST = process.env["LIC_SERVER_HOST"];
export const AUTH_LIC_SERVER_API_KEY = process.env["AUTH_LIC_SERVER_API_KEY"];

if (!AUTH_PRIVATE_KEY) {
    logger.error("No client secret. Set AUTH_PRIVATE_KEY environment variable.");
    process.exit(1);
}
