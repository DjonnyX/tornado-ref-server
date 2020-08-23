import * as express from "express";
import { ProductModel, IProduct, RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IProductItem, RESPONSE_TEMPLATE as PRODUCT_RESPONSE_TEMPLATE } from "./ProductsController";
import { formatProductModel } from "../utils/product";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse } from "./AssetsController";
import { AssetModel, IAsset } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { ProductContents } from "../models/Product";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProductAsset extends IAssetItem { }

interface IProductGetAllAssetsResponse {
    meta?: {};
    data?: {
        [lang: string]: Array<IProductAsset>,
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
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

interface IProductAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum ProductImageTypes {
    MAIN = "main",
    THUMBNAIL = "thumbnail",
    ICON = "icon",
}

const contentsToDefault = (contents: ProductContents, langCode: string) => {
    let result = { ...contents };
    if (!result) {
        result = {};
    }

    if (!result[langCode]) {
        result[langCode] = {};
    }

    if (!result[langCode].images) {
        result[langCode].images = {
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
    @OperationId("GetAll")
    @Example<IProductGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            "RU": [RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(productId: string): Promise<IProductGetAllAssetsResponse> {
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

        const promises = new Array<Promise<{ assets: Array<IAsset>, langCode: string }>>();

        for (const langCode in product.contents) {
            promises.push(new Promise(async (resolve) => {
                const assets = await AssetModel.find({ _id: product.contents[langCode].assets });
                resolve({ assets, langCode });
            }));
        }

        try {
            const assetsInfo = await Promise.all(promises);

            const result: {
                [lang: string]: Array<IProductAsset>,
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

    @Get("{productId}/assets/{langCode}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("Get")
    @Example<IProductGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(productId: string, langCode: string): Promise<IProductGetAssetsResponse> {
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
            const assets = await AssetModel.find({ _id: product.contents[langCode].assets, });

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

    @Post("{productId}/asset/{langCode}")
    @Security("jwt")
    @OperationId("Create")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async create(productId: string, langCode: string, @Request() request: express.Request): Promise<IProductCreateAssetsResponse> {
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
        const contents: ProductContents = contentsToDefault(product.contents, langCode);

        let productRef: IRefItem;
        try {
            contents[langCode].assets.push(assetsInfo.data.id.toString());

            product.contents = contents;
            product.markModified("contents");

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

    @Post("{productId}/image/{langCode}/{imageType}")
    @Security("jwt")
    @OperationId("CreateImage")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async image(productId: string, langCode: string, imageType: ProductImageTypes, @Request() request: express.Request): Promise<IProductCreateAssetsResponse> {
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

        let contents: ProductContents = contentsToDefault(product.contents, langCode);

        deletedAsset = !!contents[langCode] ? contents[langCode].images[imageType] : undefined;

        // детект количества повторяющихся изображений
        let isAssetExistsInOtherProps = 0;
        for (const contentLang in contents) {
            if (!!contents[contentLang].images) {
                for (const img in contents[contentLang].images) {
                    if (!!contents[contentLang].images[img] && contents[contentLang].images[img] === deletedAsset) {
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
        if (!!deletedAsset) {
            contents[langCode].assets = contents[langCode].assets.filter(asset => {
                return asset.toString() !== deletedAsset.toString();
            });
        }

        let productRef: IRefItem;
        let savedProduct: IProduct;
        try {
            contents[langCode].images[imageType] = assetsInfo.data.id.toString();
            contents[langCode].assets.push(assetsInfo.data.id.toString());

            if (imageType === ProductImageTypes.MAIN) {
                if (!contents[langCode].images.thumbnail) {
                    contents[langCode].images.thumbnail = contents[langCode].images.main;
                }
                if (!contents[langCode].images.icon) {
                    contents[langCode].images.icon = contents[langCode].images.main;
                }
            }

            product.contents = contents;
            product.markModified("contents");

            savedProduct = await product.save();

            productRef = await riseRefVersion(RefTypes.PRODUCTS);
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
                product: formatProductModel(savedProduct),
                asset: assetsInfo.data,
            }
        };
    }

    @Put("{productId}/asset/{langCode}/{assetId}")
    @Security("jwt")
    @OperationId("Update")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async update(productId: string, langCode: string, assetId: string, @Body() request: IProductAssetUpdateRequest): Promise<IProductCreateAssetsResponse> {

        let product: IProduct;
        try {
            product = await ProductModel.findById(productId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not found product error. ${err}`,
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

    @Delete("{productId}/asset/{langCode}/{assetId}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<IProductDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(productId: string, langCode: string, assetId: string): Promise<IProductDeleteAssetsResponse> {
        let product: IProduct;
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

        let contents: ProductContents = contentsToDefault(product.contents, langCode);

        let assetRef: IRefItem;
        const assetIndex = contents[langCode].assets.indexOf(assetId);
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
                            message: `Delete assets error. ${err}`,
                        }
                    ]
                };
            }
        }

        let productsRef: IRefItem;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            product.contents = contents;
            product.markModified("contents");

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
                        message: `Save product error. ${err}`,
                    }
                ]
            };
        }
    }
}
