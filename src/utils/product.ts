import { IProduct } from "@models";
import { IAsset } from "../models/Asset";
import { ProductContents } from "../models/Product";

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

export const getDeletedAssetsFromDifferense = (lastContents: ProductContents, newContents: ProductContents) => {
    const result = new Array<string>();

    const lastAssets = getProductAssetsFromContent(lastContents);
    const newAssets = getProductAssetsFromContent(newContents);
    
    lastAssets.forEach(asset => {
        if (newAssets.indexOf(asset) === -1) {
            result.push(asset);
        }
    });

    return result;
}

export const getProductAssetsFromContent = (contents: ProductContents) => {
    const result = new Array<string>();

    if (!!contents) {
        for (const lang in contents) {
            if (!!contents[lang]) {
                result.push(...contents[lang].assets);
            }
        }
    }

    return result;
}

export const getProductAssets = (product: IProduct) => {
    const result = new Array<string>();

    if (product) {
        if (!!product.contents) {
            return getProductAssetsFromContent(product.contents);
        }
    }

    return result;
};