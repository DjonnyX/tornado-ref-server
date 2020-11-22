import { IVisualEntityContents, IVisualEntityContentsItem, IVisualEntity } from "../models/interfaces";

export const normalizeContents = (contents: IVisualEntityContents, defaultLang: string) => {
    if (!contents) {
        return;
    }

    let defaultContent: IVisualEntityContentsItem;

    // экстракт дефолтового контента
    for (const lang in contents) {
        if (lang === defaultLang) {
            defaultContent = contents[lang];
            break;
        }
    }

    for (const lang in contents) {
        if (!!contents[lang].resources) {
            const content = contents[lang];
            for (const resourceType in content.resources) {
                const isEqualtFromDefault = equalFromImages(defaultContent, content.resources[resourceType]);
                if (resourceType !== "main" && !!content.resources.main && (!content.resources[resourceType] || (isEqualtFromDefault && lang !== defaultLang))) {
                    content.resources[resourceType] = content.resources.main;
                } else if (lang !== defaultLang && (!content.resources[resourceType] || isEqualtFromDefault) && !!defaultContent?.resources?.[resourceType]) {
                    content.resources[resourceType] = defaultContent.resources[resourceType] || defaultContent.resources.main;
                }
            }
        }
    }
};

export const equalFromImages = (content: IVisualEntityContentsItem, resource: string): boolean => {
    if (!!content && !!content.resources) {
        for (const resourceType in content) {
            if (resource == content[resourceType]) {
                return true;
            }
        }
    }
    return false;
};

export const getDeletedImagesFromDifferense = (lastContents: IVisualEntityContents, newContents: IVisualEntityContents) => {
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

export const getLangsFromContents = (lastContents: IVisualEntityContents, newContents: IVisualEntityContents) => {
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

export const getEntityAssetsFromContent = (contents: IVisualEntityContents) => {
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

export const getEntityAssetsFromContentImages = (content: IVisualEntityContentsItem) => {
    const result = new Array<string>();
    if (!!content) {
        const resources = content.resources;
        if (!!resources) {
            for (const resourceType in resources) {
                result.push(resources[resourceType]);
            }
        }
    }

    return result;
};

export const getEntityAssets = (entity: IVisualEntity) => {
    const result = new Array<string>();

    if (entity) {
        if (!!entity.contents) {
            return getEntityAssetsFromContent(entity.contents);
        }
    }

    return result;
};