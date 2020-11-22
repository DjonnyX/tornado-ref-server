import * as fs from "fs";
import { ITranslationTemplate, ILanguageTranslation } from "../interfaces/ITranslationTemplate";
import { LOCALIZATION_TEMPLATE_PATH } from "../config";
import { ITranslate } from "@djonnyx/tornado-types/dist/interfaces/raw/ITranslation";
import { ITranslationDocument } from "../models/Translation";

export const formatTranslationModel = (model: ITranslationDocument) => ({
    id: model._id,
    language: model.language,
    items: model.items.map(v => ({
        key: v.key,
        value: v.value,
    })),
    extra: model.extra,
});

export const mergeTranslation = async (translation: ITranslationDocument, save = true) => {
    const lang = translation.language;
    const template: ITranslationTemplate = JSON.parse(fs.readFileSync(LOCALIZATION_TEMPLATE_PATH).toString("utf-8"));
    const dictionary: { [key: string]: ITranslate } = {};

    translation.items.forEach(item => {
        dictionary[item.key] = item;
    });

    let isExistsTemplate = false;
    let defaultTemplateTranslation: ILanguageTranslation;
    for (const templateLang of template.languages) {
        if (templateLang.isDefault) {
            defaultTemplateTranslation = templateLang;
        }
        if (lang !== templateLang.code) {
            continue;
        }

        for (const key in templateLang.translations) {

            if (dictionary[key] === undefined || dictionary[key] === null) {
                const item = {
                    key,
                    value: templateLang.translations[key],
                } as any;
                translation.items.push(item);
                dictionary[key] = item;
            }
        }

        isExistsTemplate = true;
    }

    if (!isExistsTemplate && defaultTemplateTranslation) {
        for (const key in defaultTemplateTranslation.translations) {

            if (dictionary[key] === undefined || dictionary[key] === null) {
                const item = {
                    key,
                    value: "",
                } as any;
                translation.items.push(item);
                dictionary[key] = item;
            }
        }
    }

    if (save) {
        await translation.save();
    }
};

export const getTemplateLangs = (template: ITranslationTemplate) => {
    const result = new Array<ILanguageTranslation>();
    for (const lang of template.languages) {
        result.push(lang);
    }

    return result;
}