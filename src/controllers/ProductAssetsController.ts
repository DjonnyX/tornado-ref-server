import * as express from "express";
import { ProductModel, IProduct, RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get } from "tsoa";
import { riseRefVersion } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IProductItem, RESPONSE_TEMPLATE as PRODUCT_RESPONSE_TEMPLATE } from "./ProductsController";
import { formatProductModel } from "../utils/product";
import { IRefItem } from "./RefsController";
import { uploadAsset } from "./AssetsController";
import { AssetModel } from "src/models/Asset";
import { formatAssetModel } from "src/utils/asset";

interface IProductAsset {
    id: string;
    name: string;
    ext: AssetExtensions;
    path: string;
}

interface IProductGetAssetsResponse {
    meta?: { };
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

@Route("/product")
@Tags("Product assets")
export class ProductImagesController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @OperationId("GetOne")
    @Example<IProductGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [
            {
                id: "",
                name: "Some asset",
                ext: AssetExtensions.OBJ,
                path: "assets/some_model.obj",
            }
        ]
    })
    public async getAssets(id: string): Promise<IProductGetAssetsResponse> {
        let product: IProduct;
        try {
            product = await ProductModel.findById(id);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Product with id: "${id}" not found. ${err}`,
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
    
    @Post("{id}/assets")
    @Security("jwt")
    @OperationId("Create")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: {
                id: "107c7f79bcf86cd7994f6c0e",
                name: "some_3d_model",
                ext: AssetExtensions.FBX,
                path: "assets/some_model.fbx",
            },
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async create(id: string, @Request() request: express.Request): Promise<IProductCreateAssetsResponse> {
        const assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);

        let product: IProduct;
        try {
            product = await ProductModel.findById(id);
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
}
