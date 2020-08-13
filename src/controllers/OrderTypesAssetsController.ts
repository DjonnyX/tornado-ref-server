import * as express from "express";
import { OrderTypeModel, IOrderType, RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IOrderTypeItem, RESPONSE_TEMPLATE as PRODUCT_RESPONSE_TEMPLATE } from "./OrderTypesController";
import { formatOrderTypeModel } from "../utils/orderType";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem } from "./AssetsController";
import { AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IOrderTypeAsset extends IAssetItem { }

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

const META_TEMPLATE = {
    orderType: {
        ref: {
            name: RefTypes.PRODUCTS,
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
@Tags("OrderType assets")
export class OrderTypeAssetsController extends Controller {
    @Get("{orderTypeId}/assets")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("Get")
    @Example<IOrderTypeGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(orderTypeId: string): Promise<IOrderTypeGetAssetsResponse> {
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
            const assets = await AssetModel.find({ _id: orderType.assets, });

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

    @Post("{orderTypeId}/asset")
    @Security("jwt")
    @OperationId("Create")
    @Example<IOrderTypeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            orderType: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async create(orderTypeId: string, @Request() request: express.Request): Promise<IOrderTypeCreateAssetsResponse> {
        const assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);

        let orderType: IOrderType;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
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

        let orderTypeRef: IRefItem;
        try {
            orderType.assets.push(assetsInfo.data.id);
            orderTypeRef = await riseRefVersion(RefTypes.PRODUCTS);
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
    }
    
    @Put("{orderTypeId}/asset/{assetId}")
    @Security("jwt")
    @OperationId("Update")
    @Example<IOrderTypeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            orderType: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async update(orderTypeId: string, assetId: string, @Body() request: IOrderTypeAssetUpdateRequest): Promise<IOrderTypeCreateAssetsResponse> {

        let orderType: IOrderType;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
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
        
        let orderTypeRef: IRefItem;
        try {
            orderTypeRef = await getRef(RefTypes.PRODUCTS);
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

    @Delete("{orderTypeId}/asset/{assetId}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<IOrderTypeDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(orderTypeId: string, assetId: string): Promise<IOrderTypeDeleteAssetsResponse> {
        let orderType: IOrderType;
        try {
            orderType = await OrderTypeModel.findById(orderTypeId);
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
        const assetIndex = orderType.assets.indexOf(assetId);
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

        let orderTypesRef: IRefItem;
        try {
            orderType.assets.splice(assetIndex, 1);
            await orderType.save();
            orderTypesRef = await riseRefVersion(RefTypes.PRODUCTS);
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
                        message: `Caught error. ${err}`,
                    }
                ]
            };
        }
    }
}
