import * as express from "express";
import { ProductModel, IProduct, RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security } from "tsoa";
import { riseRefVersion } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IAsset, AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { IProductItem, RESPONSE_TEMPLATE as PRODUCT_RESPONSE_TEMPLATE } from "./ProductsController";
import { assetsUploader, IFileInfo } from "../assetUpload";
import { formatProductModel } from "../utils/product";
import { IRefItem } from "./RefsController";

interface IProductAsset {
    id: string;
    name: string;
    ext: AssetExtensions;
    path: string;
}

interface IProductImagesResponse {
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
@Tags("Product images")
export class ProductImagesController extends Controller {
    @Post("{id}/images")
    @Security("jwt")
    @OperationId("Create")
    @Example<IProductImagesResponse>({
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
    public async create(id: string, @Request() request: express.Request): Promise<IProductImagesResponse> {

        let fileInfo: IFileInfo;
        try {
            fileInfo = await assetsUploader("file", [AssetExtensions.JPG, AssetExtensions.PNG], request);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Upload error. ${err}`,
                    }
                ]
            };
        }

        let asset: IAsset;
        let assetRef: IRefItem;
        try {
            asset = new AssetModel(fileInfo);
            assetRef = await riseRefVersion(RefTypes.ASSETS);
            await asset.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Create asset error. ${err}`,
                    }
                ]
            };
        }

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
            product.assets.push(asset._id);
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
                    ref: assetRef,
                }
            },
            data: {
                product: formatProductModel(product),
                asset: formatAssetModel(asset),
            }
        };
    }
}
