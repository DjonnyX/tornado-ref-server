import { ILanguage } from "@models";

export const formatLanguageModel = (model: ILanguage) => ({
    id: model._id,
    active: model.active,
    name: model.name,
    description: model.description,
    assets: model.assets,
    images: model.images || {
        original: null,
        icon: null,
    },
    translation: model.translation,
    extra: model.extra,
});