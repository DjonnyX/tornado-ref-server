import { IEntityContents, IEntityContentsItem, IEntity } from "../models/interfaces";

export const normalizeContents = (contents: IEntityContents, defaultLang: string) => {
    if (!contents) {
        return;
    }

    let defaultContent: IEntityContentsItem;

    // экстракт дефолтового контента
    for (const lang in contents) {
        if (lang === defaultLang) {
            defaultContent = contents[lang];
            break;
        }
    }

    for (const lang in contents) {
        if (!!contents[lang].images) {
            const content = contents[lang];
            for (const imageType in content.images) {
                const isEqualtFromDefault = equalFromImages(defaultContent, content.images[imageType]);
                if (imageType !== "main" && !!content.images.main && (!content.images[imageType] || (isEqualtFromDefault && lang !== defaultLang))) {
                    content.images[imageType] = content.images.main;
                } else if (lang !== defaultLang && (!content.images[imageType] || isEqualtFromDefault) && !!defaultContent?.images?.[imageType]) {
                    content.images[imageType] = defaultContent.images[imageType] || defaultContent.images.main;
                }
            }
        }
    }
};

export const equalFromImages = (content: IEntityContentsItem, image: string): boolean => {
    if (!!content && !!content.images) {
        for (const imageType in content) {
            if (image == content[imageType]) {
                return true;
            }
        }
    }
    return false;
};

export const getDeletedImagesFromDifferense = (lastContents: IEntityContents, newContents: IEntityContents) => {
    const result = new Array<string>();

    const langs = getLangsFromContents(lastContents, newContents);
    const lastAssets = [];
    const newAssets = [];
    langs.forEach(lang => {
        lastAssets.push(...getEntityAssetsFromContentImages(lastContents[lang]));
        newAssets.push(...getEntityAssetsFromContentImages(newContents[lang]));
    });

    lastAssets.forEach((asset, index) => {
        if (!!asset) {
            if (newAssets.filter(item => item === asset).length === 0) {
                result.push(asset);
            }
        }
    });

    return result;
};

export const getLangsFromContents = (lastContents: IEntityContents, newContents: IEntityContents) => {
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
};

export const getEntityAssetsFromContent = (contents: IEntityContents) => {
    const result = new Array<string>();

    if (!!contents) {
        for (const lang in contents) {
            if (!!contents[lang]) {
                result.push(...contents[lang].assets);
            }
        }
    }

    return result;
};

export const getEntityAssetsFromContentImages = (content: IEntityContentsItem) => {
    const result = new Array<string>();
    if (!!content) {
        const images = content.images;
        if (!!images) {
            for (const imageType in images) {
                result.push(imageType);
            }
        }
    }

    return [];
};

export const getEntityAssets = (entity: IEntity) => {
    const result = new Array<string>();

    if (entity) {
        if (!!entity.contents) {
            return getEntityAssetsFromContent(entity.contents);
        }
    }

    return result;
};