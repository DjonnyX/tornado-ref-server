import { ISelector } from "@djonnyx/tornado-types";
import { ISelectorDocument } from "@models";

export const formatSelectorModel = (model: ISelectorDocument): ISelector => ({
    id: model._id,
    position: model.position,
    active: model.active,
    type: model.type,
    systemTag: model.systemTag,
    contents: model.contents,
    joint: model.joint,
    extra: model.extra,
});