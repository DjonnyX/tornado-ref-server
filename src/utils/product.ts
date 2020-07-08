import { IProduct } from "@models";

export const formatProductModel = (model: IProduct) => ({
    id: model._id,
    name: model.name,
    description: model.description,
    receipt: model.receipt,
    tags: model.tags,
    joint: model.joint,
    assets: model.assets,
});