import { readFileJSONAsync } from "../utils/file";
import { ITranslationTemplate } from "../interfaces";
import { AssetModel, ILanguageDocument, LanguageModel, TranslationModel } from "../models";
import { LOCALIZATION_TEMPLATE_PATH } from "../config";
import { getTemplateLangs, mergeTranslation } from "../utils/translation";
import { assetsUploaderFS } from "../utils/assetUpload";
import { AssetExtensions, RefTypes } from "@djonnyx/tornado-types";
import { riseRefVersion } from "./refs";

export const mergeDefaultTranslations = async (client: string) => {
    const template: ITranslationTemplate = await readFileJSONAsync<ITranslationTemplate>(LOCALIZATION_TEMPLATE_PATH);
    const availableLangs = getTemplateLangs(template);

    const dictionary: { [key: string]: ILanguageDocument } = {};
    const langs = await LanguageModel.find({
        client,
    });

    langs.forEach(item => {
        dictionary[item.code] = item;
    });

    const promises = new Array<Promise<void>>();
    availableLangs.forEach(lang => {
        if (!dictionary[lang.code]) {
            const newTranslation = new TranslationModel({
                client,
                language: lang.code,
            });
            const newLang = new LanguageModel({
                client,
                isDefault: lang.isDefault || false,
                name: lang.name,
                code: lang.code,
                translation: newTranslation._id,
            });

            promises.push(new Promise(async (resolve) => {
                const assetInfo = await assetsUploaderFS(client, String(newLang._id), [
                    AssetExtensions.JPG,
                    AssetExtensions.PNG,
                    AssetExtensions.GIF,
                    AssetExtensions.WEBP,
                ], lang.preview);

                const asset = new AssetModel({ client, ...assetInfo });

                await riseRefVersion(client, RefTypes.ASSETS);
                await asset.save();

                newLang.assets.push(asset._id);
                newLang.resources["main"] = asset._id;

                newLang.markModified("resources");

                await newTranslation.save();
                await newLang.save();
                resolve();
            }));
        }
    });

    await Promise.all(promises);

    const translations = await TranslationModel.find({ client });

    if (!!translations) {
        const promises = new Array<Promise<any>>();
        translations.forEach(translation => {
            promises.push(mergeTranslation(translation));
        });

        return Promise.all(promises);
    }
}