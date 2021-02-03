import { IAd } from "@models";
import { IAdItem } from "../controllers/AdController";

export const formatAdModel = (model: IAd): IAdItem => ({
    id: model._id,
    type: model.type,
    active: model.active,
    contents: model.contents,
    extra: model.extra,
});