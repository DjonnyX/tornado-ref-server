import { IProduct } from "@models";

export const formatProductModel = (model: IProduct) => ({
    id: model._id,
    active: model.active,
    name: model.name,
    color: model.color,
    description: model.description,
    prices: model.prices.map(price => ({
        currency: price.currency,
        value: price.value,
    })),
    receipt: model.receipt,
    tags: model.tags,
    joint: model.joint,
    assets: model.assets,
    images: model.images || {
        main: null,
        thumbnail: null,
        icon: null,
    },
    extra: model.extra,
});