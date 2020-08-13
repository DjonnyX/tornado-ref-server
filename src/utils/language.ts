import { ILanguage } from "@models";

export const formatLanguageModel = (model: ILanguage) => ({
    id: model._id,
    active: model.active,
    name: model.name,
    assets: model.assets,
    images: model.images || {
        main: null,
    },
    translation: model.translation,
    extra: model.extra,
});