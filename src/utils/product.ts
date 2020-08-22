import { IProduct } from "@models";
import { ProductContents, IProductContentsItem } from "../models/Product";

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

export const getDeletedImagesFromDifferense = (lastContents: ProductContents, newContents: ProductContents) => {
    const result = new Array<string>();

    const langs = getLangsFromContents(lastContents, newContents);

    langs.forEach(lang => {
        const lastAssets = getProductAssetsFromContentImages(lastContents[lang]);
        const newAssets = getProductAssetsFromContentImages(newContents[lang]);
    
        lastAssets.forEach((asset, index) => {
            if (newAssets[index] !== asset) {
                result.push(asset);
            }
        });
    });

    return result;
}

export const getLangsFromContents = (lastContents: ProductContents, newContents: ProductContents) => {
    const result = new Array<string>();
    for (const lang in lastContents) {
        result.push(lang);
    }
    for (const lang in newContents) {
        if (result.indexOf(lang) === -1) {
            result.push(lang);
        }
    }

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

export const getProductAssetsFromContentImages = (content: IProductContentsItem) => {
    if (!!content) {
        const images = content.images;
        if (!!images) {
            return [images.main || null, images.thumbnail || null, images.icon || null];
        }
    }

    return [null, null, null];
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