import * as express from "express";
import { OrderTypeModel, IOrderType, RefTypes, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { IOrderTypeItem, RESPONSE_TEMPLATE as SELECTOR_RESPONSE_TEMPLATE } from "./OrderTypesController";
import { formatOrderTypeModel } from "../utils/ordertype";
import { normalizeContents } from "../utils/entity";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse } from "./AssetsController";
import { AssetModel, IAsset } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { IAuthRequest } from "../interfaces";
import { AssetExtensions, IOrderTypeContents } from "@djonnyx/tornado-types";

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
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
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

interface IOrderTypeAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum OrderTypeImageTypes {
    MAIN = "main",
    ICON = "icon",
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
            icon: null,
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

const RESPONSE_TEMPLATE: IAssetItem = {
    id: "107c7f79bcf86cd7994f6c0e",
    active: true,
    lastUpdate: new Date(),
    name: "some_3d_model",
    ext: AssetExtensions.FBX,
    mipmap: {
        x128: "assets/some_3d_model_128x128.png",
        x32: "assets/favicon.png",
    },
    path: "assets/some_3d_model.fbx",
};

@Route("/order-type")
@Tags("OrderType assets")
export class OrderTypeAssetsController extends Controller {
    @Get("{orderTypeId}/assets")
    @Security("clientAccessToken")
    @Security("accessToken")
    @OperationId("GetAll")
    @Example<IOrderTypeGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            "RU": [RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(orderTypeId: string): Promise<IOrderTypeGetAllAssetsResponse> {
        let orderType: IOrderType;
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

        const promises = new Array<Promise<{ assets: Array<IAsset>, langCode: string }>>();

        for (const langCode in orderType.contents) {
            promises.push(new Promise(async (resolve) => {
                const assets = await AssetModel.find({ _id: orderType.contents[langCode].assets });
                resolve({ assets, langCode });
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
    @Security("accessToken")
    @OperationId("Get")
    @Example<IOrderTypeGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(orderTypeId: string, langCode: string): Promise<IOrderTypeGetAssetsResponse> {
        let orderType: IOrderType;
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
    @OperationId("Create")
    @Example<IOrderTypeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            orderType: SELECTOR_RESPONSE_TEMPLATE,
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

        let orderTypeRef: IRefItem;
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
    @OperationId("CreateResource")
    @Example<IOrderTypeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            orderType: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async resource(orderTypeId: string, langCode: string, resourceType: OrderTypeImageTypes, @Request() request: IAuthRequest): Promise<IOrderTypeCreateAssetsResponse> {
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

        let orderType: IOrderType;
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

        let defaultLanguage: ILanguage;
        try {
            defaultLanguage = await LanguageModel.findOne({ client: request.client.id, isDefault: true });
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
                    await riseRefVersion(request.client.id, RefTypes.ASSETS);
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

        let orderTypeRef: IRefItem;
        let savedOrderType: IOrderType;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].resources[resourceType] = assetId;
            contents[langCode].assets.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            orderType.contents = contents;
            orderType.markModified("contents");

            savedOrderType = await orderType.save();

            orderTypeRef = await riseRefVersion(request.client.id, RefTypes.SELECTORS);
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
    @OperationId("Update")
    @Example<IOrderTypeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            orderType: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async update(orderTypeId: string, langCode: string, assetId: string, @Body() body: IOrderTypeAssetUpdateRequest, @Request() request: IAuthRequest): Promise<IOrderTypeCreateAssetsResponse> {

        let orderType: IOrderType;
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

        let orderTypeRef: IRefItem;
        try {
            orderTypeRef = await getRef(request.client.id, RefTypes.SELECTORS);
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

            const ref = await riseRefVersion(request.client.id, RefTypes.ASSETS);
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
    @OperationId("Delete")
    @Example<IOrderTypeDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(orderTypeId: string, langCode: string, assetId: string, @Request() request: IAuthRequest): Promise<IOrderTypeDeleteAssetsResponse> {
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

        let contents: IOrderTypeContents = contentsToDefault(orderType.contents, langCode);

        let assetRef: IRefItem;
        const assetIndex = contents[langCode].assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                if (!!asset) {
                    await deleteAsset(asset.path);
                    await deleteAsset(asset.mipmap.x128);
                    await deleteAsset(asset.mipmap.x32);
                    assetRef = await riseRefVersion(request.client.id, RefTypes.ASSETS);
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

        let orderTypesRef: IRefItem;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            orderType.contents = contents;
            orderType.markModified("contents");

            await orderType.save();

            orderTypesRef = await riseRefVersion(request.client.id, RefTypes.SELECTORS);
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
