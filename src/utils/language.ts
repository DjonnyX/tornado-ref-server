import { ILanguage } from "@models";

export const formatLanguageModel = (model: ILanguage) => ({
    id: model._id,
    active: model.active,
    isDefault: model.isDefault,
    code: model.code,
    contents: model.contents,
    translation: model.translation,
    extra: model.extra,
});