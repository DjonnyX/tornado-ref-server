import { ILanguage } from "@djonnyx/tornado-types";
import { ILanguageDocument } from "@models";

export const formatLanguageModel = (model: ILanguageDocument): ILanguage => ({
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