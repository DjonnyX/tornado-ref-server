import { AssetExtensions, IAdContents, IRef, RefTypes } from "@djonnyx/tornado-types";
import { AdModel, IAdDocument, ILanguageDocument, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AD_RESPONSE_TEMPLATE, IAdItem } from "./AdController";
import { formatAdModel } from "../utils/ad";
import { contentsToDefault, normalizeContents } from "../utils/entity";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse, ASSET_RESPONSE_TEMPLATE } from "./AssetsController";
import { AssetModel, IAssetDocument } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { IAuthRequest } from "../interfaces";
import { getClientId } from "../utils/account";
import { LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";

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
            ref: IRef;
        };
        asset: {
            ref: IRef;
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
            ref: IRef;
        };
        asset: {
            ref: IRef;
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

@Route("/ad")
@Tags("Ad assets")
export class AdAssetsController extends Controller {
    @Get("{adId}/assets")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<IAdGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            [LANGUAGE_RESPONSE_TEMPLATE?.code]: [ASSET_RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(adId: string): Promise<IAdGetAllAssetsResponse> {
        let ad: IAdDocument;
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

        const promises = new Array<Promise<{ assets: Array<IAssetDocument>, langCode: string }>>();

        for (const langCode in ad.contents) {
            promises.push(new Promise(async (resolve, reject) => {
                let assets: Array<IAssetDocument>;
                if (ad.contents?.[langCode]?.assets?.length > 0) {
                    try {
                        assets = await AssetModel.find({ _id: ad.contents?.[langCode]?.assets });
                    } catch (err) {
                        return reject(err);
                    }
                }
                resolve({ assets: assets || [], langCode });
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Get")
    @Example<IAdGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [ASSET_RESPONSE_TEMPLATE],
    })
    public async getAssets(adId: string, langCode: string): Promise<IAdGetAssetsResponse> {
        let ad: IAdDocument;
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
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

        let adRef: IRef;
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("CreateResource")
    @Example<IAdCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: ASSET_RESPONSE_TEMPLATE,
            ad: AD_RESPONSE_TEMPLATE,
        }
    })
    public async resource(adId: string, langCode: string, resourceType: AdImageTypes, @Request() request: IAuthRequest): Promise<IAdCreateAssetsResponse> {
        const client = getClientId(request);

        let assetsInfo: ICreateAssetsResponse;
        try {
            assetsInfo = await uploadAsset(request, [
                AssetExtensions.JPG,
                AssetExtensions.PNG,
                AssetExtensions.GIF,
                AssetExtensions.WEBP,
                AssetExtensions.MP4
            ], false);
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

        let ad: IAdDocument;
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

        let defaultLanguage: ILanguageDocument;
        try {
            defaultLanguage = await LanguageModel.findOne({ client, isDefault: true });
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
                    await riseRefVersion(client, RefTypes.ASSETS);
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

        let adRef: IRef;
        let savedAd: IAdDocument;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].resources[resourceType] = assetId;
            contents[langCode].assets.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            ad.contents = contents;
            ad.markModified("contents");

            savedAd = await ad.save();

            adRef = await riseRefVersion(client, RefTypes.ADS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<IAdCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: ASSET_RESPONSE_TEMPLATE,
            ad: AD_RESPONSE_TEMPLATE,
        }
    })
    public async update(adId: string, langCode: string, assetId: string, @Body() body: IAdAssetUpdateRequest, @Request() request: IAuthRequest): Promise<IAdCreateAssetsResponse> {
        const client = getClientId(request);

        let ad: IAdDocument;
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

        let adRef: IRef;
        try {
            adRef = await getRef(client, RefTypes.ADS);
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

            for (const key in body) {
                item[key] = body[key];
            }

            await item.save();

            const ref = await riseRefVersion(client, RefTypes.ASSETS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<IAdDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(adId: string, langCode: string, assetId: string, @Request() request: IAuthRequest): Promise<IAdDeleteAssetsResponse> {
        const client = getClientId(request);

        let ad: IAdDocument;
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

        let assetRef: IRef;
        const assetIndex = contents[langCode].assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                if (!!asset) {
                    await deleteAsset(asset.path);
                    await deleteAsset(asset.mipmap.x128);
                    await deleteAsset(asset.mipmap.x32);
                    assetRef = await riseRefVersion(client, RefTypes.ASSETS);
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

        let adsRef: IRef;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            ad.contents = contents;
            ad.markModified("contents");

            await ad.save();

            adsRef = await riseRefVersion(client, RefTypes.ADS);
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
