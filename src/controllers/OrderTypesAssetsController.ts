import { OrderTypeModel, IOrderTypeDocument, ILanguageDocument, LanguageModel } from "../models";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { IOrderTypeItem, ORDER_TYPE_RESPONSE_TEMPLATE } from "./OrderTypesController";
import { formatOrderTypeModel } from "../utils/orderType";
import { normalizeContents } from "../utils/entity";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse, ASSET_RESPONSE_TEMPLATE } from "./AssetsController";
import { AssetModel, IAssetDocument } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { IAuthRequest } from "../interfaces";
import { AssetExtensions, IOrderTypeContents, IRef, RefTypes } from "@djonnyx/tornado-types";
import { getClientId } from "../utils/account";
import { LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IOrderTypeAsset extends IAssetItem { }

interface IOrderTypeGetAllAssetsResponse {
    meta?: {};
    data?: {
        [lang: string]: Array<IOrderTypeAsset>,
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IOrderTypeGetAssetsResponse {
    meta?: {};
    data?: Array<IOrderTypeAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IOrderTypeCreateAssetsResponse {
    meta?: {
        orderType: {
            ref: IRef;
        };
        asset: {
            ref: IRef;
        };
    };
    data?: {
        asset: IOrderTypeAsset;
        orderType: IOrderTypeItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IOrderTypeDeleteAssetsResponse {
    meta?: {
        orderType: {
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

interface IOrderTypeAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum OrderTypeImageTypes {
    MAIN = "main",
}

const contentsToDefault = (contents: IOrderTypeContents, langCode: string) => {
    let result = { ...contents };
    if (!result) {
        result = {};
    }

    if (!result[langCode]) {
        result[langCode] = {} as any;
    }

    if (!result[langCode].resources) {
        result[langCode].resources = {
            main: null,
        };
    }

    if (!result[langCode].assets) {
        result[langCode].assets = [];
    }

    return result;
}

const META_TEMPLATE = {
    orderType: {
        ref: {
            name: RefTypes.SELECTORS,
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

@Route("/order-type")
@Tags("OrderType assets")
export class OrderTypeAssetsController extends Controller {
    @Get("{orderTypeId}/assets")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<IOrderTypeGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            [LANGUAGE_RESPONSE_TEMPLATE?.code]: [ASSET_RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(orderTypeId: string): Promise<IOrderTypeGetAllAssetsResponse> {
        let orderType: IOrderTypeDocument;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `OrderType with id: "${orderTypeId}" not found. ${err}`,
                    }
                ]
            };
        }

        const promises = new Array<Promise<{ assets: Array<IAssetDocument>, langCode: string }>>();

        for (const langCode in orderType.contents) {
            promises.push(new Promise(async (resolve, reject) => {
                let assets: Array<IAssetDocument>;
                if (orderType.contents?.[langCode]?.assets?.length > 0) {
                    try {
                        assets = await AssetModel.find({ _id: orderType.contents?.[langCode]?.assets });
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
                [lang: string]: Array<IOrderTypeAsset>,
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

    @Get("{orderTypeId}/assets/{langCode}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Get")
    @Example<IOrderTypeGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [ASSET_RESPONSE_TEMPLATE],
    })
    public async getAssets(orderTypeId: string, langCode: string): Promise<IOrderTypeGetAssetsResponse> {
        let orderType: IOrderTypeDocument;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `OrderType with id: "${orderTypeId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assets = await AssetModel.find({ _id: orderType.contents[langCode].assets, });

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

    /*@Post("{orderTypeId}/asset/{langCode}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<IOrderTypeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: ASSET_RESPONSE_TEMPLATE,
            orderType: ORDER_TYPE_RESPONSE_TEMPLATE,
        }
    })
    public async create(orderTypeId: string, langCode: string, @Request() request: express.Request): Promise<IOrderTypeCreateAssetsResponse> {
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

        let orderType: IOrderType;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find orderType error. ${err}`,
                    }
                ]
            };
        }

        const contents: IOrderTypeContents = contentsToDefault(orderType.contents, langCode);

        let orderTypeRef: IRef;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].assets.push(assetId);

            orderType.contents = contents;
            orderType.markModified("contents");

            orderTypeRef = await riseRefVersion(RefTypes.SELECTORS);
            await orderType.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to orderType assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                orderType: {
                    ref: orderTypeRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                orderType: formatOrderTypeModel(orderType),
                asset: assetsInfo.data,
            }
        };
    }*/

    @Post("{orderTypeId}/resource/{langCode}/{resourceType}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("CreateResource")
    @Example<IOrderTypeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: ASSET_RESPONSE_TEMPLATE,
            orderType: ORDER_TYPE_RESPONSE_TEMPLATE,
        }
    })
    public async resource(orderTypeId: string, langCode: string, resourceType: OrderTypeImageTypes, @Request() request: IAuthRequest): Promise<IOrderTypeCreateAssetsResponse> {
        const client = getClientId(request);

        let assetsInfo: ICreateAssetsResponse;
        try {
            assetsInfo = await uploadAsset(request, [
                AssetExtensions.JPG,
                AssetExtensions.PNG,
                AssetExtensions.GIF,
                AssetExtensions.WEBP,
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

        let orderType: IOrderTypeDocument;
        let deletedAsset: string;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find orderType error. ${err}`,
                    }
                ]
            };
        }

        let defaultLanguage: ILanguageDocument;
        try {
            defaultLanguage = await LanguageModel.findOne({ client: client, isDefault: true });
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

        let contents: IOrderTypeContents = contentsToDefault(orderType.contents, langCode);

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

        let orderTypeRef: IRef;
        let savedOrderType: IOrderTypeDocument;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].resources[resourceType] = assetId;
            contents[langCode].assets.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            orderType.contents = contents;
            orderType.markModified("contents");

            savedOrderType = await orderType.save();

            orderTypeRef = await riseRefVersion(client, RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to orderType assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                orderType: {
                    ref: orderTypeRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                orderType: formatOrderTypeModel(savedOrderType),
                asset: assetsInfo.data,
            }
        };
    }

    @Put("{orderTypeId}/asset/{langCode}/{assetId}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<IOrderTypeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: ASSET_RESPONSE_TEMPLATE,
            orderType: ORDER_TYPE_RESPONSE_TEMPLATE,
        }
    })
    public async update(orderTypeId: string, langCode: string, assetId: string, @Body() body: IOrderTypeAssetUpdateRequest, @Request() request: IAuthRequest): Promise<IOrderTypeCreateAssetsResponse> {
        const client = getClientId(request);

        let orderType: IOrderTypeDocument;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not found orderType error. ${err}`,
                    }
                ]
            };
        }

        let orderTypeRef: IRef;
        try {
            orderTypeRef = await getRef(client, RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get orderType ref error. ${err}`,
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
                    orderType: {
                        ref: orderTypeRef,
                    },
                },
                data: {
                    asset: formatAssetModel(item),
                    orderType: formatOrderTypeModel(orderType),
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

    @Delete("{orderTypeId}/asset/{langCode}/{assetId}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<IOrderTypeDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(orderTypeId: string, langCode: string, assetId: string, @Request() request: IAuthRequest): Promise<IOrderTypeDeleteAssetsResponse> {
        const client = getClientId(request);

        let orderType: IOrderTypeDocument;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find orderType error. ${err}`,
                    }
                ]
            };
        }

        let contents: IOrderTypeContents = contentsToDefault(orderType.contents, langCode);

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

        let orderTypesRef: IRef;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            orderType.contents = contents;
            orderType.markModified("contents");

            await orderType.save();

            orderTypesRef = await riseRefVersion(client, RefTypes.SELECTORS);
            return {
                meta: {
                    orderType: {
                        ref: orderTypesRef,
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
                        message: `Save orderType error. ${err}`,
                    }
                ]
            };
        }
    }
}
