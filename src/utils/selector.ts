import { ISelector } from "@djonnyx/tornado-types";
import { ISelectorDocument } from "@models";

export const formatSelectorModel = (model: ISelectorDocument): ISelector => ({
    id: model._id,
    active: model.active,
    type: model.type,
    contents: model.contents,
    joint: model.joint,
    extra: model.extra,
});