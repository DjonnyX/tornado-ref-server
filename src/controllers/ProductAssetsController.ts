import * as express from "express";
import { ProductModel, IProduct, RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IProductItem, RESPONSE_TEMPLATE as PRODUCT_RESPONSE_TEMPLATE } from "./ProductsController";
import { formatProductModel } from "../utils/product";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem } from "./AssetsController";
import { AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProductAsset extends IAssetItem { }

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

interface IProductAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum ProductImageTypes {
    MAIN = "main",
    THUMBNAIL = "thumbnail",
    ICON = "icon",
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

@Route("/product")
@Tags("Product assets")
export class ProductAssetsController extends Controller {
    @Get("{productId}/assets")
    @Security("jwt")
    @Security("apiKey")
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
            const assets = await AssetModel.find({ _id: product.assets, });

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

    @Post("{productId}/image/{lang}/{imageType}")
    @Security("jwt")
    @OperationId("CreateImage")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async image(lang: string, productId: string, imageType: ProductImageTypes, @Request() request: express.Request): Promise<IProductCreateAssetsResponse> {
        const assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA], false);

        let product: IProduct;
        let deletedAsset: string;
        try {
            product = await ProductModel.findById(productId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find product error. ${err}`,
                    }
                ]
            };
        }

        deletedAsset = !!product.content[lang] ? product.content[lang].images[imageType] : undefined;

        // удаление связанных изображений, если lang является основным языком
        for (const contentLang in product.content) {
            if (contentLang === lang) {
                continue;
            }

            if (product.content[contentLang][imageType] === deletedAsset) {
                product.content[contentLang][imageType] = null;
            }
        }
        
        const assetIndex = deletedAsset ? product.assets.indexOf(deletedAsset) : -1;
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(deletedAsset);
                await deleteAsset(asset.path);
                await deleteAsset(asset.mipmap.x128);
                await deleteAsset(asset.mipmap.x32);
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
        product.assets = product.assets.filter(asset => asset.toString() !== deletedAsset.toString());

        let productRef: IRefItem;
        try {
            if (!product.content[lang]) {
                product.content[lang] = {
                    name: "Some name",
                    description: "Some description",
                    images: {
                        main: null,
                        thumbnail: null,
                        icon: null,
                    },
                }
            }

            product.content[lang].images[imageType] = assetsInfo.data.id;

            if (imageType === ProductImageTypes.MAIN) {
                if (!product.content[lang].images.thumbnail) {
                    product.content[lang].images.thumbnail = product.content[lang].images.main;
                }
                if (!product.content[lang].images.icon) {
                    product.content[lang].images.icon = product.content[lang].images.main;
                }
            }

            product.assets.push(assetsInfo.data.id);
            productRef = await riseRefVersion(RefTypes.ORDER_TYPES);
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
    
    @Put("{productId}/asset/{assetId}")
    @Security("jwt")
    @OperationId("Update")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async update(productId: string, assetId: string, @Body() request: IProductAssetUpdateRequest): Promise<IProductCreateAssetsResponse> {

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
            productRef = await getRef(RefTypes.PRODUCTS);
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
                    product: {
                        ref: productRef,
                    },
                 },
                data: {
                    asset: formatAssetModel(item),
                    product: formatProductModel(product),
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
