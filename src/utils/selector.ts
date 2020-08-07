import { ISelector } from "@models";

export const formatSelectorModel = (model: ISelector) => ({
    id: model._id,
    active: model.active,
    type: model.type,
    name: model.name,
    color: model.color,
    description: model.description,
    joint: model.joint,
    assets: model.assets,
    images: model.images || {
        main: null,
        thumbnail: null,
        icon: null,
    },
    extra: model.extra,
});