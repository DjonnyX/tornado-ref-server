import * as express from "express";
import { ProductModel, IProduct, RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete } from "tsoa";
import { riseRefVersion } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IProductItem, RESPONSE_TEMPLATE as PRODUCT_RESPONSE_TEMPLATE } from "./ProductsController";
import { formatProductModel } from "../utils/product";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset } from "./AssetsController";
import { AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";

interface IProductAsset {
    id: string;
    name: string;
    ext: AssetExtensions;
    path: string;
}

interface IProductGetAssetsResponse {
    meta?: {};
    data?: Array<IProductAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IProductCreateAssetsResponse {
    meta?: {
        product: {
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
        };
    };
    data?: {
        asset: IProductAsset;
        product: IProductItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IProductDeleteAssetsResponse {
    meta?: {
        product: {
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

const META_TEMPLATE = {
    product: {
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

const RESPONSE_TEMPLATE = {
    id: "107c7f79bcf86cd7994f6c0e",
    name: "some_3d_model",
    ext: AssetExtensions.FBX,
    path: "assets/some_3d_model.fbx",
};

@Route("/product")
@Tags("Product assets")
export class ProductImagesController extends Controller {
    @Get("{productId}/assets")
    @Security("jwt")
    @OperationId("Get")
    @Example<IProductGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(productId: string): Promise<IProductGetAssetsResponse> {
        let product: IProduct;
        try {
            product = await ProductModel.findById(productId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Product with id: "${productId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assets = await AssetModel.find({ id: product.assets, });

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

    @Post("{productId}/asset")
    @Security("jwt")
    @OperationId("Create")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async create(productId: string, @Request() request: express.Request): Promise<IProductCreateAssetsResponse> {
        const assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);

        let product: IProduct;
        try {
            product = await ProductModel.findById(productId);
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

        let productRef: IRefItem;
        try {
            product.assets.push(assetsInfo.data.id);
            productRef = await riseRefVersion(RefTypes.PRODUCTS);
            await product.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to product assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                product: {
                    ref: productRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                product: formatProductModel(product),
                asset: assetsInfo.data,
            }
        };
    }

    @Delete("{productId}/asset/{assetId}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<IProductDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(productId: string, assetId: string): Promise<IProductDeleteAssetsResponse> {
        let product: IProduct;
        try {
            product = await ProductModel.findById(productId);
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
        const assetIndex = product.assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                await deleteAsset(asset.path);
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

        let productsRef: IRefItem;
        try {
            product.assets.splice(assetIndex, 1);
            await product.save();
            productsRef = await riseRefVersion(RefTypes.PRODUCTS);
            return {
                meta: {
                    product: {
                        ref: productsRef,
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
