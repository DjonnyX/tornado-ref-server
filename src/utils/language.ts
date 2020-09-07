import { ILanguage } from "@models";

export const formatLanguageModel = (model: ILanguage) => ({
    id: model._id,
    active: model.active,
    isDefault: model.isDefault,
    code: model.code,
    name: model.name,
    assets: model.assets,
    resources: model.resources || {
        main: null,
    },
    translation: model.translation,
    extra: model.extra,
});