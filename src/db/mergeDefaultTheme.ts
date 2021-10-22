import { AssetExtensions, RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
import { assetsUploaderFS } from "../utils/assetUpload";
import { AppThemeModel, AssetModel } from "../models";
import { readFileJSONAsync } from "../utils/file";
import { riseRefVersion } from "./refs";
import { deepMergeObjects } from "../utils/object";
import { normalizeTerminalTheme } from "../utils/terminal";

export const mergeDefaultTheme = async (client: string, templatePath: string, type: TerminalTypes) => {
    const template = await readFileJSONAsync(templatePath);

    const promises = new Array<Promise<void>>();

    for (const themeName in template) {
        const themeData = template[themeName].data;
        promises.push(new Promise(async (resolve, reject) => {
            try {
                let theme = await AppThemeModel.findOne({
                    client,
                    type,
                    name: themeName,
                });

                if (!theme) {

                    theme = new AppThemeModel({
                        isDefault: true,
                        client,
                        type,
                        name: themeName,
                        version: 1,
                        lastUpdate: new Date(Date.now()),
                        assets: [],
                        resources: {},
                        data: themeData,
                    });

                    const savedTheme = await theme.save();

                    const themeId = savedTheme._id.toString();

                    const assetInfo = await assetsUploaderFS(client, themeId, [
                        AssetExtensions.JPG,
                        AssetExtensions.PNG,
                        AssetExtensions.GIF,
                        AssetExtensions.WEBP,
                    ], template[themeName].preview);

                    const asset = new AssetModel({ client, ...assetInfo });

                    await riseRefVersion(client, RefTypes.ASSETS);
                    await asset.save();

                    savedTheme.assets.push(asset._id);
                    savedTheme.resources["thumbnail"] = asset._id;

                    savedTheme.markModified("resources");

                    await savedTheme.save();

                    return resolve();
                }

                const data = deepMergeObjects(themeData, theme.data, true);
                theme.data = data;
                theme.version = (Number(theme.version) || 1) + 1;
                theme.lastUpdate = new Date(Date.now());
                theme.markModified("data");

                await theme.save();

                resolve();
            } catch (err) {
                reject(err);
            }
        }));
    }

    await Promise.all(promises);

    await normalizeTerminalTheme(client, type);
};