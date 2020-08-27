import * as express from "express";
import { LanguageModel, ILanguage, RefTypes } from "../models";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { ILanguageItem, RESPONSE_TEMPLATE as SELECTOR_RESPONSE_TEMPLATE } from "./LanguagesController";
import { formatLanguageModel } from "../utils/language";
import { normalizeContents } from "../utils/entity";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse } from "./AssetsController";
import { AssetModel, IAsset } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { ILanguageContents } from "../models/Language";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ILanguageAsset extends IAssetItem { }

interface ILanguageGetAllAssetsResponse {
    meta?: {};
    data?: {
        [lang: string]: Array<ILanguageAsset>,
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ILanguageGetAssetsResponse {
    meta?: {};
    data?: Array<ILanguageAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ILanguageCreateAssetsResponse {
    meta?: {
        language: {
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
        };
    };
    data?: {
        asset: ILanguageAsset;
        language: ILanguageItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ILanguageDeleteAssetsResponse {
    meta?: {
        language: {
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

interface ILanguageAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum LanguageImageTypes {
    MAIN = "main",
    ICON = "icon",
}

const contentsToDefault = (contents: ILanguageContents, langCode: string) => {
    let result = { ...contents };
    if (!result) {
        result = {};
    }

    if (!result[langCode]) {
        result[langCode] = {};
    }

    if (!result[langCode].images) {
        result[langCode].images = {
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
    language: {
        ref: {
            name: RefTypes.LANGUAGES,
            version: 1,
            lastUpdate: 1589885721,
        },
    },
    asset: {
        ref: {
            name: RefTypes.ASSETS,
            version: 1,
            lastUpdate: 1589885721,
        },
    },
};

const RESPONSE_TEMPLATE: IAssetItem = {
    id: "107c7f79bcf86cd7994f6c0e",
    active: true,
    lastupdate: 1589885721,
    name: "some_3d_model",
    ext: AssetExtensions.FBX,
    mipmap: {
        x128: "assets/some_3d_model_128x128.png",
        x32: "assets/favicon.png",
    },
    path: "assets/some_3d_model.fbx",
};

@Route("/order-type")
@Tags("Language assets")
export class LanguageAssetsController extends Controller {
    @Get("{languageId}/assets")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<ILanguageGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            "RU": [RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(languageId: string): Promise<ILanguageGetAllAssetsResponse> {
        let language: ILanguage;
        try {
            language = await LanguageModel.findById(languageId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Language with id: "${languageId}" not found. ${err}`,
                    }
                ]
            };
        }

        const promises = new Array<Promise<{ assets: Array<IAsset>, langCode: string }>>();

        for (const langCode in language.contents) {
            promises.push(new Promise(async (resolve) => {
                const assets = await AssetModel.find({ _id: language.contents[langCode].assets });
                resolve({ assets, langCode });
            }));
        }

        try {
            const assetsInfo = await Promise.all(promises);

            const result: {
                [lang: string]: Array<ILanguageAsset>,
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

    @Get("{languageId}/assets/{langCode}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("Get")
    @Example<ILanguageGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(languageId: string, langCode: string): Promise<ILanguageGetAssetsResponse> {
        let language: ILanguage;
        try {
            language = await LanguageModel.findById(languageId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Language with id: "${languageId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assets = await AssetModel.find({ _id: language.contents[langCode].assets, });

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

    /*@Post("{languageId}/asset/{langCode}")
    @Security("jwt")
    @OperationId("Create")
    @Example<ILanguageCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            language: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async create(languageId: string, langCode: string, @Request() request: express.Request): Promise<ILanguageCreateAssetsResponse> {
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

        let language: ILanguage;
        try {
            language = await LanguageModel.findById(languageId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find language error. ${err}`,
                    }
                ]
            };
        }

        const contents: ILanguageContents = contentsToDefault(language.contents, langCode);

        let languageRef: IRefItem;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].assets.push(assetId);

            language.contents = contents;
            language.markModified("contents");

            languageRef = await riseRefVersion(RefTypes.SELECTORS);
            await language.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to language assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                language: {
                    ref: languageRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                language: formatLanguageModel(language),
                asset: assetsInfo.data,
            }
        };
    }*/

    @Post("{languageId}/image/{langCode}/{imageType}")
    @Security("jwt")
    @OperationId("CreateImage")
    @Example<ILanguageCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            language: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async image(languageId: string, langCode: string, imageType: LanguageImageTypes, @Request() request: express.Request): Promise<ILanguageCreateAssetsResponse> {
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

        let language: ILanguage;
        let deletedAsset: string;
        try {
            language = await LanguageModel.findById(languageId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find language error. ${err}`,
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

        let contents: ILanguageContents = contentsToDefault(language.contents, langCode);

        deletedAsset = !!contents[langCode] ? contents[langCode].images[imageType] : undefined;

        // детект количества повторяющихся изображений
        let isAssetExistsInOtherProps = 0;
        for (const contentLang in contents) {
            if (!!contents[contentLang].images) {
                for (const img in contents[contentLang].images) {
                    if (!!contents[contentLang].images[img] && contents[contentLang].images[img] === deletedAsset) {
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

        let languageRef: IRefItem;
        let savedLanguage: ILanguage;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].images[imageType] = assetId;
            contents[langCode].assets.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            language.contents = contents;
            language.markModified("contents");

            savedLanguage = await language.save();

            languageRef = await riseRefVersion(RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to language assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                language: {
                    ref: languageRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                language: formatLanguageModel(savedLanguage),
                asset: assetsInfo.data,
            }
        };
    }

    @Put("{languageId}/asset/{langCode}/{assetId}")
    @Security("jwt")
    @OperationId("Update")
    @Example<ILanguageCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            language: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async update(languageId: string, langCode: string, assetId: string, @Body() request: ILanguageAssetUpdateRequest): Promise<ILanguageCreateAssetsResponse> {

        let language: ILanguage;
        try {
            language = await LanguageModel.findById(languageId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not found language error. ${err}`,
                    }
                ]
            };
        }

        let languageRef: IRefItem;
        try {
            languageRef = await getRef(RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get language ref error. ${err}`,
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
                    language: {
                        ref: languageRef,
                    },
                },
                data: {
                    asset: formatAssetModel(item),
                    language: formatLanguageModel(language),
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

    @Delete("{languageId}/asset/{langCode}/{assetId}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<ILanguageDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(languageId: string, langCode: string, assetId: string): Promise<ILanguageDeleteAssetsResponse> {
        let language: ILanguage;
        try {
            language = await LanguageModel.findById(languageId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find language error. ${err}`,
                    }
                ]
            };
        }

        let contents: ILanguageContents = contentsToDefault(language.contents, langCode);

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

        let languagesRef: IRefItem;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            language.contents = contents;
            language.markModified("contents");

            await language.save();

            languagesRef = await riseRefVersion(RefTypes.SELECTORS);
            return {
                meta: {
                    language: {
                        ref: languagesRef,
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
                        message: `Save language error. ${err}`,
                    }
                ]
            };
        }
    }
}
