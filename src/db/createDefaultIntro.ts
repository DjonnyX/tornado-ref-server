import { AdTypes } from "@djonnyx/tornado-types";
import { readFileJSONAsync } from "../utils/file";
import { IScreenSaverManifest } from "../interfaces";
import { AdModel } from "../models";
import {
    DEFAULT_INTRO_TEMPLATE_MANIFEST_PATH,
    DEFAULT_INTRO_TEMPLATE_DATA_PATH,
} from "../config";
import { createAd } from "../utils/ad";

export const createDefaultIntroIfNeed = async (client: string) => {
    const ads = await AdModel.find({ client, type: AdTypes.INTRO });

    if (ads.length > 0) {
        return;
    }

    const template: IScreenSaverManifest = await readFileJSONAsync<IScreenSaverManifest>(DEFAULT_INTRO_TEMPLATE_MANIFEST_PATH);

    try {
        createAd(client, template.name, template.duration, AdTypes.INTRO, DEFAULT_INTRO_TEMPLATE_DATA_PATH);
    } catch (err) {
        console.error(err);
    }
};