import { ISelector } from "@models";

export const formatSelectorModel = (model: ISelector) => ({
    id: model._id,
    active: model.active,
    type: model.type,
    contents: model.contents,
    joint: model.joint,
    extra: model.extra,
});