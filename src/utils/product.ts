import { IProduct } from "@djonnyx/tornado-types";
import { IProductDocument } from "@models";

export const formatProductModel = (model: IProductDocument): IProduct => ({
    id: model._id,
    position: model.position,
    active: model.active,
    contents: model.contents,
    prices: model.prices.map(price => ({
        currency: price.currency,
        value: price.value,
    })),
    receipt: model.receipt,
    tags: model.tags,
    weight: model.weight,
    weightUnitId: model.weightUnitId,
    systemTag: model.systemTag,
    joint: model.joint,
    extra: model.extra,
});
