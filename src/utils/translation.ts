import { ITranslation } from "@models";

export const formatTranslationModel = (model: ITranslation) => ({
    id: model._id,
    items: model.items.map(v => ({
        key: v.key,
        value: v.value,
    })),
    extra: model.extra,
});