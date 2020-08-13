import * as express from "express";
import { RefTypes, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem } from "./AssetsController";
import { AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { ILanguageItem, LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";
import { formatLanguageModel } from "../utils/language";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ILanguageAsset extends IAssetItem { }

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

interface ILanguageUpdateAssetsRequest {
    name: string;
    active: boolean;
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

@Route("/language")
@Tags("Language assets")
export class LanguageAssetsController extends Controller {
    @Get("{languageId}/assets")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("Get")
    @Example<ILanguageGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(languageId: string): Promise<ILanguageGetAssetsResponse> {
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
            const assets = await AssetModel.find({ _id: language.assets, });

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

    @Post("{languageId}/asset")
    @Security("jwt")
    @OperationId("Create")
    @Example<ILanguageCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            language: LANGUAGE_RESPONSE_TEMPLATE,
        }
    })
    public async create(languageId: string, @Request() request: express.Request): Promise<ILanguageCreateAssetsResponse> {
        const assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);

        let language: ILanguage;
        try {
            language = await LanguageModel.findById(languageId);
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

        let languageRef: IRefItem;
        try {
            language.assets.push(assetsInfo.data.id);
            languageRef = await riseRefVersion(RefTypes.LANGUAGES);
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
    }

    
    @Put("{languageId}/asset/{assetId}")
    @Security("jwt")
    @OperationId("Update")
    @Example<ILanguageCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            language: LANGUAGE_RESPONSE_TEMPLATE,
        }
    })
    public async update(languageId: string, assetId: string, @Body() request: ILanguageUpdateAssetsRequest): Promise<ILanguageCreateAssetsResponse> {

        let language: ILanguage;
        try {
            language = await LanguageModel.findById(languageId);
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
        
        let languageRef: IRefItem;
        try {
            languageRef = await getRef(RefTypes.LANGUAGES);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get product ref error. ${err}`,
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

    @Delete("{languageId}/asset/{assetId}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<ILanguageDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(languageId: string, assetId: string): Promise<ILanguageDeleteAssetsResponse> {
        let language: ILanguage;
        try {
            language = await LanguageModel.findById(languageId);
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

        let assetRef: IRefItem;
        const assetIndex = language.assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                await deleteAsset(asset.path);
                await deleteAsset(asset.mipmap.x128);
                await deleteAsset(asset.mipmap.x32);
                assetRef = await riseRefVersion(RefTypes.ASSETS);
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

        let languagesRef: IRefItem;
        try {
            language.assets.splice(assetIndex, 1);
            await language.save();
            languagesRef = await riseRefVersion(RefTypes.LANGUAGES);
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
                        message: `Caught error. ${err}`,
                    }
                ]
            };
        }
    }
}
