import * as express from "express";
import { SelectorModel, ISelector, RefTypes, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { ISelectorItem, RESPONSE_TEMPLATE as SELECTOR_RESPONSE_TEMPLATE } from "./SelectorController";
import { formatSelectorModel } from "../utils/selector";
import { normalizeContents } from "../utils/entity";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse } from "./AssetsController";
import { AssetModel, IAsset } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { ISelectorContents } from "../models/Selector";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISelectorAsset extends IAssetItem { }

interface ISelectorGetAllAssetsResponse {
    meta?: {};
    data?: {
        [lang: string]: Array<ISelectorAsset>,
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorGetAssetsResponse {
    meta?: {};
    data?: Array<ISelectorAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorCreateAssetsResponse {
    meta?: {
        selector: {
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
        };
    };
    data?: {
        asset: ISelectorAsset;
        selector: ISelectorItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorDeleteAssetsResponse {
    meta?: {
        selector: {
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
        };
    };
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum SelectorImageTypes {
    MAIN = "main",
    ICON = "icon",
}

const contentsToDefault = (contents: ISelectorContents, langCode: string) => {
    let result = { ...contents };
    if (!result) {
        result = {};
    }

    if (!result[langCode]) {
        result[langCode] = {};
    }

    if (!result[langCode].resources) {
        result[langCode].resources = {
            main: null,
            icon: null,
        };
    }

    if (!result[langCode].assets) {
        result[langCode].assets = [];
    }

    return result;
}

const META_TEMPLATE = {
    selector: {
        ref: {
            name: RefTypes.SELECTORS,
            version: 1,
            lastupdate: new Date(),
        },
    },
    asset: {
        ref: {
            name: RefTypes.ASSETS,
            version: 1,
            lastupdate: new Date(),
        },
    },
};

const RESPONSE_TEMPLATE: IAssetItem = {
    id: "107c7f79bcf86cd7994f6c0e",
    active: true,
    lastupdate: new Date(),
    name: "some_3d_model",
    ext: AssetExtensions.FBX,
    mipmap: {
        x128: "assets/some_3d_model_128x128.png",
        x32: "assets/favicon.png",
    },
    path: "assets/some_3d_model.fbx",
};

@Route("/selector")
@Tags("Selector assets")
export class SelectorAssetsController extends Controller {
    @Get("{selectorId}/assets")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<ISelectorGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            "RU": [RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(selectorId: string): Promise<ISelectorGetAllAssetsResponse> {
        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Selector with id: "${selectorId}" not found. ${err}`,
                    }
                ]
            };
        }

        const promises = new Array<Promise<{ assets: Array<IAsset>, langCode: string }>>();

        for (const langCode in selector.contents) {
            promises.push(new Promise(async (resolve) => {
                const assets = await AssetModel.find({ _id: selector.contents[langCode].assets });
                resolve({ assets, langCode });
            }));
        }

        try {
            const assetsInfo = await Promise.all(promises);

            const result: {
                [lang: string]: Array<ISelectorAsset>,
            } = {};
            assetsInfo.forEach(assetInfo => {
                result[assetInfo.langCode] = assetInfo.assets.map(asset => formatAssetModel(asset));
            });

            return {
                meta: {},
                data: result,
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Caught error. ${err}`,
                    }
                ]
            };
        }
    }

    @Get("{selectorId}/assets/{langCode}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("Get")
    @Example<ISelectorGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(selectorId: string, langCode: string): Promise<ISelectorGetAssetsResponse> {
        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Selector with id: "${selectorId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assets = await AssetModel.find({ _id: selector.contents[langCode].assets, });

            return {
                meta: {},
                data: assets.map(asset => formatAssetModel(asset)),
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Caught error. ${err}`,
                    }
                ]
            };
        }
    }

    /*@Post("{selectorId}/asset/{langCode}")
    @Security("jwt")
    @OperationId("Create")
    @Example<ISelectorCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            selector: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async create(selectorId: string, langCode: string, @Request() request: express.Request): Promise<ISelectorCreateAssetsResponse> {
        let assetsInfo: ICreateAssetsResponse;
        try {
            assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Upload asset error. ${err}`,
                    }
                ]
            };
        }

        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find selector error. ${err}`,
                    }
                ]
            };
        }

        const contents: ISelectorContents = contentsToDefault(selector.contents, langCode);

        let selectorRef: IRefItem;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].assets.push(assetId);

            selector.contents = contents;
            selector.markModified("contents");

            selectorRef = await riseRefVersion(RefTypes.SELECTORS);
            await selector.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to selector assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                selector: {
                    ref: selectorRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                selector: formatSelectorModel(selector),
                asset: assetsInfo.data,
            }
        };
    }*/

    @Post("{selectorId}/resource/{langCode}/{resourceType}")
    @Security("jwt")
    @OperationId("CreateResource")
    @Example<ISelectorCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            selector: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async resource(selectorId: string, langCode: string, resourceType: SelectorImageTypes, @Request() request: express.Request): Promise<ISelectorCreateAssetsResponse> {
        let assetsInfo: ICreateAssetsResponse;
        try {
            assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA], false);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Upload asset error. ${err}`,
                    }
                ]
            };
        }

        let selector: ISelector;
        let deletedAsset: string;
        try {
            selector = await SelectorModel.findById(selectorId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find selector error. ${err}`,
                    }
                ]
            };
        }

        let defaultLanguage: ILanguage;
        try {
            defaultLanguage = await LanguageModel.findOne({ isDefault: true });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Default language error. ${err}`,
                    }
                ]
            };
        }

        let contents: ISelectorContents = contentsToDefault(selector.contents, langCode);

        deletedAsset = !!contents[langCode] ? contents[langCode].resources[resourceType] : undefined;

        // детект количества повторяющихся изображений
        let isAssetExistsInOtherProps = 0;
        for (const contentLang in contents) {
            if (!!contents[contentLang].resources) {
                for (const img in contents[contentLang].resources) {
                    if (!!contents[contentLang].resources[img] && contents[contentLang].resources[img] === deletedAsset) {
                        isAssetExistsInOtherProps++;
                    }
                }
            }
        }

        // Удаление ассета только если он не используется в разных свойствах
        if (isAssetExistsInOtherProps !== 1) {
            deletedAsset = undefined;
        }

        const assetIndex = !!deletedAsset ? contents[langCode].assets.indexOf(deletedAsset) : -1;
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(deletedAsset);
                if (!!asset) {
                    await deleteAsset(asset.path);
                    await deleteAsset(asset.mipmap.x128);
                    await deleteAsset(asset.mipmap.x32);
                    await riseRefVersion(RefTypes.ASSETS);
                }
            } catch (err) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: `Delete asset error. ${err}`,
                        }
                    ]
                };
            }
        }

        // удаление предыдущего ассета
        if (!!deletedAsset) {
            contents[langCode].assets = contents[langCode].assets.filter(asset => {
                return asset.toString() !== deletedAsset.toString();
            });
        }

        let selectorRef: IRefItem;
        let savedSelector: ISelector;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].resources[resourceType] = assetId;
            contents[langCode].assets.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            selector.contents = contents;
            selector.markModified("contents");

            savedSelector = await selector.save();

            selectorRef = await riseRefVersion(RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to selector assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                selector: {
                    ref: selectorRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                selector: formatSelectorModel(savedSelector),
                asset: assetsInfo.data,
            }
        };
    }

    @Put("{selectorId}/asset/{langCode}/{assetId}")
    @Security("jwt")
    @OperationId("Update")
    @Example<ISelectorCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            selector: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async update(selectorId: string, langCode: string, assetId: string, @Body() request: ISelectorAssetUpdateRequest): Promise<ISelectorCreateAssetsResponse> {

        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not found selector error. ${err}`,
                    }
                ]
            };
        }

        let selectorRef: IRefItem;
        try {
            selectorRef = await getRef(RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get selector ref error. ${err}`,
                    }
                ]
            };
        }

        try {
            const item = await AssetModel.findById(assetId);

            for (const key in request) {
                item[key] = request[key];
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.ASSETS);
            return {
                meta: {
                    asset: {
                        ref,
                    },
                    selector: {
                        ref: selectorRef,
                    },
                },
                data: {
                    asset: formatAssetModel(item),
                    selector: formatSelectorModel(selector),
                },
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Caught error. ${err}`,
                    }
                ]
            };
        }
    }

    @Delete("{selectorId}/asset/{langCode}/{assetId}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<ISelectorDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(selectorId: string, langCode: string, assetId: string): Promise<ISelectorDeleteAssetsResponse> {
        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find selector error. ${err}`,
                    }
                ]
            };
        }

        let contents: ISelectorContents = contentsToDefault(selector.contents, langCode);

        let assetRef: IRefItem;
        const assetIndex = contents[langCode].assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                if (!!asset) {
                    await deleteAsset(asset.path);
                    await deleteAsset(asset.mipmap.x128);
                    await deleteAsset(asset.mipmap.x32);
                    assetRef = await riseRefVersion(RefTypes.ASSETS);
                }
            } catch (err) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: `Delete assets error. ${err}`,
                        }
                    ]
                };
            }
        }

        let selectorsRef: IRefItem;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            selector.contents = contents;
            selector.markModified("contents");

            await selector.save();

            selectorsRef = await riseRefVersion(RefTypes.SELECTORS);
            return {
                meta: {
                    selector: {
                        ref: selectorsRef,
                    },
                    asset: {
                        ref: assetRef,
                    },
                }
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save selector error. ${err}`,
                    }
                ]
            };
        }
    }
}
