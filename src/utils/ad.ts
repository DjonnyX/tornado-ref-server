import { AdResourceTypes, AdTypes, AssetExtensions, IAdContents, ILanguage, RefTypes } from "@djonnyx/tornado-types";
import { AdModel, IAdDocument, LanguageModel, AssetModel } from "../models";
import { riseRefVersion } from "../db/refs";
import { IAdItem } from "../controllers/AdController";
import { assetsUploaderFS } from "./assetUpload";
import { contentsToDefault, normalizeContents } from "./entity";

export const formatAdModel = (model: IAdDocument): IAdItem => ({
    id: model._id,
    type: model.type,
    active: model.active,
    contents: model.contents,
    extra: model.extra,
});

export const createAd = async (client: string, name: string, duration: number, type: AdTypes, src: string) => {
    let defaultLanguage: ILanguage;
    try {
        defaultLanguage = await LanguageModel.findOne({ client, isDefault: true });
    } catch (err) {
        throw Error(`Find default language fail. ${err}`);
    }

    const ad = new AdModel({
        client,
        active: true,
        type,
        contents: {},
    });

    const adId = ad._id.toString();

    const assetInfo = await assetsUploaderFS(client, adId, [
        AssetExtensions.JPG,
        AssetExtensions.PNG,
        AssetExtensions.GIF,
        AssetExtensions.WEBP,
        AssetExtensions.MP4,
    ], src);

    const asset = new AssetModel({ client, ...assetInfo });

    await riseRefVersion(client, RefTypes.ASSETS);
    await asset.save();

    let contents: IAdContents = contentsToDefault(ad.contents, defaultLanguage.code);

    contents[defaultLanguage.code].name = name;
    contents[defaultLanguage.code].duration = duration;

    const assetId = asset._id.toString();
    contents[defaultLanguage.code].resources[AdResourceTypes.MAIN] = assetId;
    contents[defaultLanguage.code].assets.push(assetId);

    normalizeContents(contents, defaultLanguage.code);

    ad.contents = contents;
    ad.markModified("contents");

    await ad.save();
    await riseRefVersion(client, RefTypes.ADS);
}