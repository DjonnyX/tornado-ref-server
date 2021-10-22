import { AssetExtensions, RefTypes } from "@djonnyx/tornado-types";
import { AssetModel, IAppThemeDocument } from "../models";
import * as mongoose from "mongoose";
import { assetsUploaderFS } from "../utils/assetUpload";
import { getThemeDescriptor, ThemeDescriptiorKeyTypes } from "../utils/themeDescriptor";
import { riseRefVersion } from "./refs";

export const uploadThemeAssets = async (client: string, theme: IAppThemeDocument) => {
    const descriptor = getThemeDescriptor(theme);

    const promises = new Array<Promise<void>>();
    for (const propName in descriptor) {
        const prop = descriptor[propName];

        if (prop.type === ThemeDescriptiorKeyTypes.ASSET) {
            if (prop.value !== undefined && !theme.resources[propName]) {
                promises.push(new Promise(async (resolve) => {
                    const _asset = new AssetModel({ client, name: "temp", path: "temp", ext: ".png", lastUpdate: new Date() });
                    const asset = await _asset.save();

                    const assetId = String(asset._id);
                    const assetInfo = await assetsUploaderFS(client, assetId, [
                        AssetExtensions.JPG,
                        AssetExtensions.PNG,
                        AssetExtensions.GIF,
                        AssetExtensions.WEBP,
                    ], prop.value);

                    for (const key in assetInfo) {
                        asset[key] = assetInfo[key];

                        if (key === "extra") {
                            asset.markModified(key);
                        }
                    }

                    await asset.save();

                    await riseRefVersion(client, RefTypes.ASSETS);

                    theme.assets.push(assetId);
                    theme.resources[propName] = assetId;

                    theme.markModified("resources");

                    await theme.save();
                    resolve();
                }));
            }
        }
    }

    await Promise.all(promises);
}