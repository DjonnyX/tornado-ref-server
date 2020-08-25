import { IProduct } from "@models";

export const formatProductModel = (model: IProduct) => ({
    id: model._id,
    active: model.active,
    contents: model.contents,
    prices: model.prices.map(price => ({
        currency: price.currency,
        value: price.value,
    })),
    receipt: model.receipt,
    tags: model.tags,
    joint: model.joint,
    extra: model.extra,
});
