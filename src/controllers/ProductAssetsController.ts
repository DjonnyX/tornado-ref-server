import { ProductModel, IProductDocument, ILanguageDocument, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { IProductItem, PRODUCT_RESPONSE_TEMPLATE } from "./ProductsController";
import { formatProductModel } from "../utils/product";
import { normalizeContents } from "../utils/entity";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse, ASSET_RESPONSE_TEMPLATE } from "./AssetsController";
import { AssetModel, IAssetDocument } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { IAuthRequest } from "src/interfaces";
import { AssetExtensions, IProductContents, IRef, RefTypes } from "@djonnyx/tornado-types";
import { getClientId } from "../utils/account";
import { LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";

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
            ref: IRef;
        };
        asset: {
            ref: IRef;
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

interface IProductAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum ProductImageTypes {
    MAIN = "main",
}

const contentsToDefault = (contents: IProductContents, langCode: string) => {
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

    if (!result[langCode].gallery) {
        result[langCode].gallery = [];
    }

    return result;
}

const META_TEMPLATE = {
    product: {
        ref: {
            name: RefTypes.PRODUCTS,
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

@Route("/product")
@Tags("Product assets")
export class ProductAssetsController extends Controller {
    @Get("{productId}/assets")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<IProductGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            [LANGUAGE_RESPONSE_TEMPLATE?.code]: [ASSET_RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(productId: string): Promise<IProductGetAllAssetsResponse> {
        let product: IProductDocument;
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

        const promises = new Array<Promise<{ assets: Array<IAssetDocument>, langCode: string }>>();

        for (const langCode in product.contents) {
            promises.push(new Promise(async (resolve, reject) => {
                let assets: Array<IAssetDocument>;
                if (product.contents?.[langCode]?.assets?.length > 0) {
                    try {
                        assets = await AssetModel.find({ _id: product.contents?.[langCode]?.assets });
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Get")
    @Example<IProductGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [ASSET_RESPONSE_TEMPLATE],
    })
    public async getAssets(productId: string, langCode: string): Promise<IProductGetAssetsResponse> {
        let product: IProductDocument;
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: ASSET_RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async create(productId: string, langCode: string, @Request() request: IAuthRequest): Promise<IProductCreateAssetsResponse> {
        const client = getClientId(request);

        let assetsInfo: ICreateAssetsResponse;
        try {
            assetsInfo = await uploadAsset(request, [
                AssetExtensions.JPG,
                AssetExtensions.PNG,
                AssetExtensions.GIF,
                AssetExtensions.WEBP,
            ]);
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

        let product: IProductDocument;
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

        const contents: IProductContents = contentsToDefault(product.contents, langCode);

        let productRef: IRef;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].assets.push(assetId);
            contents[langCode].gallery.push(assetId);

            product.contents = contents;
            product.markModified("contents");

            productRef = await riseRefVersion(client, RefTypes.PRODUCTS);
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

    @Post("{productId}/resource/{langCode}/{resourceType}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("CreateResource")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: ASSET_RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async resource(productId: string, langCode: string, resourceType: ProductImageTypes, @Request() request: IAuthRequest): Promise<IProductCreateAssetsResponse> {
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

        let product: IProductDocument;
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

        let contents: IProductContents = contentsToDefault(product.contents, langCode);

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

        let productRef: IRef;
        let savedProduct: IProductDocument;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].resources[resourceType] = assetId;
            contents[langCode].assets.push(assetId);
            contents[langCode].gallery.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            product.contents = contents;
            product.markModified("contents");

            savedProduct = await product.save();

            productRef = await riseRefVersion(client, RefTypes.PRODUCTS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<IProductCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: ASSET_RESPONSE_TEMPLATE,
            product: PRODUCT_RESPONSE_TEMPLATE,
        }
    })
    public async update(productId: string, langCode: string, assetId: string, @Body() body: IProductAssetUpdateRequest, @Request() request: IAuthRequest): Promise<IProductCreateAssetsResponse> {
        const client = getClientId(request);

        let product: IProductDocument;
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

        let productRef: IRef;
        try {
            productRef = await getRef(client, RefTypes.PRODUCTS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<IProductDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(productId: string, langCode: string, assetId: string, @Request() request: IAuthRequest): Promise<IProductDeleteAssetsResponse> {
        const client = getClientId(request);

        let product: IProductDocument;
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

        let contents: IProductContents = contentsToDefault(product.contents, langCode);

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

        let productsRef: IRef;
        try {
            contents[langCode].assets.splice(assetIndex, 1);
            contents[langCode].gallery.splice(assetIndex, 1);

            product.contents = contents;
            product.markModified("contents");

            await product.save();

            productsRef = await riseRefVersion(client, RefTypes.PRODUCTS);
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
