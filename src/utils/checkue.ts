import { ICheckueDocument } from "@models";

export const formatCheckueModel = (model: ICheckueDocument) => ({
    id: model._id,
    active: model.active,
    name: model.name,
    scenarios: model.scenarios,
    extra: model.extra,
});