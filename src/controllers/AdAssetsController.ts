import * as express from "express";
import { AdModel, IAd, RefTypes, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IAdItem, RESPONSE_TEMPLATE as AD_RESPONSE_TEMPLATE } from "./AdController";
import { formatAdModel } from "../utils/ad";
import { normalizeContents } from "../utils/entity";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse } from "./AssetsController";
import { AssetModel, IAsset } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { IAdContents } from "../models/Ad";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAdAsset extends IAssetItem { }

interface IAdGetAllAssetsResponse {
    meta?: {};
    data?: {
        [lang: string]: Array<IAdAsset>,
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAdGetAssetsResponse {
    meta?: {};
    data?: Array<IAdAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAdCreateAssetsResponse {
    meta?: {
        ad: {
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
        };
    };
    data?: {
        asset: IAdAsset;
        ad: IAdItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAdDeleteAssetsResponse {
    meta?: {
        ad: {
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

interface IAdAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum AdImageTypes {
    MAIN = "main",
    THUMBNAIL = "thumbnail",
    ICON = "icon",
}

const contentsToDefault = (contents: IAdContents, langCode: string) => {
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
            thumbnail: null,
            icon: null,
        };
    }

    if (!result[langCode].assets) {
        result[langCode].assets = [];
    }

    return result;
}

const META_TEMPLATE = {
    ad: {
        ref: {
            name: RefTypes.ADS,
            version: 1,
            lastUpdate: new Date(),
        },
    },
    asset: {
        ref: {
            name: RefTypes.ASSETS,
            version: 1,
            lastUpdate: new Date(),
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

@Route("/ad")
@Tags("Ad assets")
export class AdAssetsController extends Controller {
    @Get("{adId}/assets")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<IAdGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            "RU": [RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(adId: string): Promise<IAdGetAllAssetsResponse> {
        let ad: IAd;
        try {
            ad = await AdModel.findById(adId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Ad with id: "${adId}" not found. ${err}`,
                    }
                ]
            };
        }

        const promises = new Array<Promise<{ assets: Array<IAsset>, langCode: string }>>();

        for (const langCode in ad.contents) {
            promises.push(new Promise(async (resolve) => {
                const assets = await AssetModel.find({ _id: ad.contents[langCode].assets });
                resolve({ assets, langCode });
            }));
        }

        try {
            const assetsInfo = await Promise.all(promises);

            const result: {
                [lang: string]: Array<IAdAsset>,
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

    @Get("{adId}/assets/{langCode}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("Get")
    @Example<IAdGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(adId: string, langCode: string): Promise<IAdGetAssetsResponse> {
        let ad: IAd;
        try {
            ad = await AdModel.findById(adId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Ad with id: "${adId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assets = await AssetModel.find({ _id: ad.contents[langCode].assets, });

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

    /*@Post("{adId}/asset/{langCode}")
    @Security("jwt")
    @OperationId("Create")
    @Example<IAdCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            ad: AD_RESPONSE_TEMPLATE,
        }
    })
    public async create(adId: string, langCode: string, @Request() request: express.Request): Promise<IAdCreateAssetsResponse> {
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

        let ad: IAd;
        try {
            ad = await AdModel.findById(adId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find ad error. ${err}`,
                    }
                ]
            };
        }

        const contents: IAdContents = contentsToDefault(ad.contents, langCode);

        let adRef: IRefItem;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].assets.push(assetId);

            ad.contents = contents;
            ad.markModified("contents");

            adRef = await riseRefVersion(RefTypes.ADS);
            await ad.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to ad assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                ad: {
                    ref: adRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                ad: formatAdModel(ad),
                asset: assetsInfo.data,
            }
        };
    }*/

    @Post("{adId}/resource/{langCode}/{resourceType}")
    @Security("jwt")
    @OperationId("CreateImage")
    @Example<IAdCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            ad: AD_RESPONSE_TEMPLATE,
        }
    })
    public async resource(adId: string, langCode: string, resourceType: AdImageTypes, @Request() request: express.Request): Promise<IAdCreateAssetsResponse> {
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

        let ad: IAd;
        let deletedAsset: string;
        try {
            ad = await AdModel.findById(adId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find ad error. ${err}`,
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

        let contents: IAdContents = contentsToDefault(ad.contents, langCode);

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

        let adRef: IRefItem;
        let savedAd: IAd;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].resources[resourceType] = assetId;
            contents[langCode].assets.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            ad.contents = contents;
            ad.markModified("contents");

            savedAd = await ad.save();

            adRef = await riseRefVersion(RefTypes.ADS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to ad assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                ad: {
                    ref: adRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                ad: formatAdModel(savedAd),
                asset: assetsInfo.data,
            }
        };
    }

    @Put("{adId}/asset/{langCode}/{assetId}")
    @Security("jwt")
    @OperationId("Update")
    @Example<IAdCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            ad: AD_RESPONSE_TEMPLATE,
        }
    })
    public async update(adId: string, langCode: string, assetId: string, @Body() request: IAdAssetUpdateRequest): Promise<IAdCreateAssetsResponse> {

        let ad: IAd;
        try {
            ad = await AdModel.findById(adId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not found ad error. ${err}`,
                    }
                ]
            };
        }

        let adRef: IRefItem;
        try {
            adRef = await getRef(RefTypes.ADS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get ad ref error. ${err}`,
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
                    ad: {
                        ref: adRef,
                    },
                },
                data: {
                    asset: formatAssetModel(item),
                    ad: formatAdModel(ad),
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

    @Delete("{adId}/asset/{langCode}/{assetId}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<IAdDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(adId: string, langCode: string, assetId: string): Promise<IAdDeleteAssetsResponse> {
        let ad: IAd;
        try {
            ad = await AdModel.findById(adId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find ad error. ${err}`,
                    }
                ]
            };
        }

        let contents: IAdContents = contentsToDefault(ad.contents, langCode);

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

        let adsRef: IRefItem;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            ad.contents = contents;
            ad.markModified("contents");

            await ad.save();

            adsRef = await riseRefVersion(RefTypes.ADS);
            return {
                meta: {
                    ad: {
                        ref: adsRef,
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
                        message: `Save ad error. ${err}`,
                    }
                ]
            };
        }
    }
}
