import { AdTypes } from "@djonnyx/tornado-types";
import { readFileJSONAsync } from "../utils/file";
import { AdModel } from "../models";
import { IScreenSaverManifest } from "../interfaces";
import {
    DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_MANIFEST_PATH,
    DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_DATA_PATH,
} from "../config";
import { createAd } from "../utils/ad";

export const createDefaultServiceUnavailableScreensaverIfNeed = async (client: string) => {
    const ads = await AdModel.find({ client, type: AdTypes.SERVICE_UNAVAILABLE });

    if (ads.length > 0) {
        return;
    }

    const template: IScreenSaverManifest = await readFileJSONAsync<IScreenSaverManifest>(DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_MANIFEST_PATH);

    try {
        createAd(client, template.name, template.duration, AdTypes.SERVICE_UNAVAILABLE, DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_DATA_PATH);
    } catch (err) {
        console.error(err);
    }
};