import { IProduct } from "@models";

export const formatProductModel = (model: IProduct) => {
    const content: any = {};
    if (!!model.content) {
        for (const lang in model.content) {
            content[lang] = {
                name: model.content[lang].name,
                description: model.content[lang].description,
                color: model.content[lang].color,
                images: model.content[lang].images || {
                    main: null,
                    thumbnail: null,
                    icon: null,
                },
                assets: model.content[lang].assets,
            }
        }
    }
    return {
        id: model._id,
        active: model.active,
        content,
        prices: model.prices.map(price => ({
            currency: price.currency,
            value: price.value,
        })),
        receipt: model.receipt,
        tags: model.tags,
        joint: model.joint,
        extra: model.extra,
    };
};