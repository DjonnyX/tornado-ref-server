import { IAd } from "@models";

export const formatAdModel = (model: IAd) => ({
    id: model._id,
    active: model.active,
    contents: model.contents,
    extra: model.extra,
});