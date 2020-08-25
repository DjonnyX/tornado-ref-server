"use strict";
exports.__esModule = true;
exports.getProductAssets = exports.getProductAssetsFromContentImages = exports.getProductAssetsFromContent = exports.getLangsFromContents = exports.getDeletedImagesFromDifferense = exports.equalFromImages = exports.normalizeProductContents = exports.formatProductModel = void 0;
var ProductAssetsController_1 = require("../controllers/ProductAssetsController");
exports.formatProductModel = function (model) { return ({
    id: model._id,
    active: model.active,
    contents: model.contents,
    prices: model.prices.map(function (price) { return ({
        currency: price.currency,
        value: price.value
    }); }),
    receipt: model.receipt,
    tags: model.tags,
    joint: model.joint,
    extra: model.extra
}); };
exports.normalizeProductContents = function (contents, defaultLang) {
    var _a;
    if (!contents) {
        return;
    }
    var defaultContent;
    // экстракт дефолтового контента
    for (var lang in contents) {
        if (lang === defaultLang) {
            defaultContent = contents[lang];
            break;
        }
    }
    for (var lang in contents) {
        if (!!contents[lang].images) {
            var content = contents[lang];
            for (var imageType in content.images) {
                var isEqualtFromDefault = exports.equalFromImages(defaultContent, content.images[imageType]);
                if (imageType !== ProductAssetsController_1.ProductImageTypes.MAIN && !!content.images.main && (!content.images[imageType] || (isEqualtFromDefault && lang !== defaultLang))) {
                    content.images[imageType] = content.images.main;
                }
                else if (lang !== defaultLang && (!content.images[imageType] || isEqualtFromDefault) && !!((_a = defaultContent === null || defaultContent === void 0 ? void 0 : defaultContent.images) === null || _a === void 0 ? void 0 : _a[imageType])) {
                    content.images[imageType] = defaultContent.images[imageType] || defaultContent.images.main;
                }
            }
        }
    }
};
exports.equalFromImages = function (content, image) {
    if (!!content && !!content.images) {
        for (var imageType in content) {
            if (image == content[imageType]) {
                return true;
            }
        }
    }
    return false;
};
exports.getDeletedImagesFromDifferense = function (lastContents, newContents) {
    var result = new Array();
    var langs = exports.getLangsFromContents(lastContents, newContents);
    var lastAssets = [];
    var newAssets = [];
    langs.forEach(function (lang) {
        lastAssets.push.apply(lastAssets, exports.getProductAssetsFromContentImages(lastContents[lang]));
        newAssets.push.apply(newAssets, exports.getProductAssetsFromContentImages(newContents[lang]));
    });
    lastAssets.forEach(function (asset, index) {
        if (!!asset) {
            if (newAssets.filter(function (item) { return item === asset; }).length === 0) {
                result.push(asset);
            }
        }
    });
    return result;
};
exports.getLangsFromContents = function (lastContents, newContents) {
    var result = new Array();
    for (var lang in lastContents) {
        result.push(lang);
    }
    for (var lang in newContents) {
        if (result.indexOf(lang) === -1) {
            result.push(lang);
        }
    }
    return result;
};
exports.getProductAssetsFromContent = function (contents) {
    var result = new Array();
    if (!!contents) {
        for (var lang in contents) {
            if (!!contents[lang]) {
                result.push.apply(result, contents[lang].assets);
            }
        }
    }
    return result;
};
exports.getProductAssetsFromContentImages = function (content) {
    if (!!content) {
        var images = content.images;
        if (!!images) {
            return [images.main || null, images.thumbnail || null, images.icon || null];
        }
    }
    return [null, null, null];
};
exports.getProductAssets = function (product) {
    var result = new Array();
    if (product) {
        if (!!product.contents) {
            return exports.getProductAssetsFromContent(product.contents);
        }
    }
    return result;
};
