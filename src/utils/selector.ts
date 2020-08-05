import { ISelector } from "@models";

export const formatSelectorModel = (model: ISelector) => ({
    id: model._id,
    active: model.active,
    type: model.type,
    name: model.name,
    description: model.description,
    joint: model.joint,
    assets: model.assets,
    mainAsset: model.mainAsset,
    extra: model.extra,
});