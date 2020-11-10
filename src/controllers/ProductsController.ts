import { ProductModel, IProduct, IReceiptItem, RefTypes, NodeModel, IPrice, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes } from "../models/enums";
import { deleteNodesChain } from "../utils/node";
import { formatProductModel } from "../utils/product";
import { getEntityAssets, getDeletedImagesFromDifferense, normalizeContents } from "../utils/entity";
import { IProductContents } from "../models/Product";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";

export interface IProductItem {
    id?: string;
    name?: string;
    active: boolean;
    contents: IProductContents;
    prices: Array<IPrice>;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    joint?: string;
    extra?: { [key: string]: any } | null;
}

export interface IProductsMeta {
    ref: IRefItem;
}

interface IProductsResponse {
    meta?: IProductsMeta;
    data?: Array<IProductItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IProductResponse {
    meta?: IProductsMeta;
    data?: IProductItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IProductCreateRequest {
    active: boolean;
    name?: string;
    contents?: IProductContents;
    prices: Array<IPrice>;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    joint?: string;
    extra?: { [key: string]: any } | null;
}

interface IProductUpdateRequest {
    active?: boolean;
    name?: string;
    contents?: IProductContents;
    prices?: Array<IPrice>;
    receipt?: Array<IReceiptItem>;
    tags?: Array<string>;
    joint?: string;
    extra?: { [key: string]: any } | null;
}

export const RESPONSE_TEMPLATE: IProductItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    contents: {
        "RU": {
            name: "Products on concert",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            color: "#000000",
            resources: {
                main: "g8h07f79bcf86cd7994f9d7k",
                icon: "gt7h7f79bcf86cd7994f9d6u",
            },
            assets: ["g8h07f79bcf86cd7994f9d7k",],
        },
    },
    prices: [
        {
            currency: "657c7f79bcf86cd7994f6c5h",
            value: 12000,
        }
    ],
    receipt: [
        {
            name: "Bun",
            description: "Crispy bun",
            quantity: 1,
            calories: 142,
        },
        {
            name: "Cutlet",
            description: "Beef cutlet",
            quantity: 1,
            calories: 346,
        }
    ],
    tags: ["123c7f79bcf86cd7994f6c0e"],
    joint: "df3c7f79bcf86cd7994f9d8f",
    extra: { key: "value" },
};

const META_TEMPLATE: IProductsMeta = {
    ref: {
        name: RefTypes.PRODUCTS,
        version: 1,
        lastupdate: new Date(),
    }
};

@Route("/products")
@Tags("Product")
export class ProductsController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<IProductsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<IProductsResponse> {
        try {
            const items = await ProductModel.find({ $client: request.client });
            const ref = await getRef(request.client, RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: items.map(v => formatProductModel(v)),
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

@Route("/product")
@Tags("Product")
export class ProductController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<IProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IProductResponse> {
        try {
            const item = await ProductModel.findById(id);
            const ref = await getRef(request.client, RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: formatProductModel(item),
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

    @Post()
    @Security("jwt")
    @OperationId("Create")
    @Example<IProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IProductCreateRequest, @Request() request: IAuthRequest): Promise<IProductResponse> {
        let params: IProductItem;
        try {

            // создается корневой нод
            const jointNode = new NodeModel({
                $client: request.client,
                active: true,
                type: NodeTypes.PRODUCT_JOINT,
                parentId: null,
                contentId: null,
                children: [],
            });
            const jointRootNode = await jointNode.save();

            params = { ...body, joint: jointRootNode._id } as any;
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Error in creation joint node. ${err}`,
                    }
                ]
            };
        }

        try {
            const item = new ProductModel(params);
            const savedItem = await item.save();
            const ref = await riseRefVersion(request.client, RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: formatProductModel(savedItem),
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

    @Put("{id}")
    @Security("jwt")
    @OperationId("Update")
    @Example<IProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IProductUpdateRequest, @Request() request: IAuthRequest): Promise<IProductResponse> {
        let defaultLanguage: ILanguage;
        try {
            defaultLanguage = await LanguageModel.findOne({ $client: request.client, isDefault: true });
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

        try {
            const item = await ProductModel.findById(id);

            let lastContents: IProductContents;
            for (const key in body) {
                if (key === "joint") {
                    continue;
                }

                if (key === "contents") {
                    lastContents = item.contents;
                }

                item[key] = body[key];

                if (key === "extra" || key === "contents") {
                    if (key === "contents") {
                        normalizeContents(item.contents, defaultLanguage.code);
                    }
                    item.markModified(key);
                }
            }

            // удаление ассетов из разности resources
            const deletedAssetsFromImages = getDeletedImagesFromDifferense(lastContents, item.contents);
            const promises = new Array<Promise<any>>();
            let isAssetsChanged = false;
            deletedAssetsFromImages.forEach(assetId => {
                promises.push(new Promise(async (resolve, reject) => {
                    // удаление из списка assets
                    if (item.contents) {
                        for (const lang in item.contents) {
                            const content = item.contents[lang];
                            if (!!content && !!content.assets) {
                                const index = content.assets.indexOf(assetId);
                                if (index !== -1) {
                                    content.assets.splice(index, 1);
                                }
                            }
                        }
                    }

                    // физическое удаление asset'а
                    const asset = await AssetModel.findByIdAndDelete(assetId);
                    if (!!asset) {
                        await deleteAsset(asset.path);
                        await deleteAsset(asset.mipmap.x128);
                        await deleteAsset(asset.mipmap.x32);
                        isAssetsChanged = true;
                    }
                    resolve();
                }));
            });
            await Promise.all(promises);

            if (isAssetsChanged) {
                await riseRefVersion(request.client, RefTypes.ASSETS);
            }

            // выставление ассетов от предыдущего состояния
            // ассеты неьзя перезаписывать напрямую!
            if (!!lastContents) {
                for (const lang in lastContents) {
                    if (!item.contents[lang]) {
                        item.contents[lang] = {};
                    }
                    if (lastContents[lang]) {
                        item.contents[lang].assets = lastContents[lang].assets;
                    }
                }
            }

            await item.save();

            const ref = await riseRefVersion(request.client, RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: formatProductModel(item),
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

    @Delete("{id}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<IProductResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IProductResponse> {
        let product: IProduct;
        try {
            product = await ProductModel.findByIdAndDelete(id);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find and delete product error. ${err}`,
                    }
                ]
            };
        }

        // нужно удалять ассеты
        const assetsList = getEntityAssets(product);

        const promises = new Array<Promise<any>>();

        try {
            let isAssetsChanged = false;
            assetsList.forEach(assetId => {
                promises.push(new Promise(async (resolve) => {
                    const asset = await AssetModel.findByIdAndDelete(assetId);
                    if (!!asset) {
                        await deleteAsset(asset.path);
                        await deleteAsset(asset.mipmap.x128);
                        await deleteAsset(asset.mipmap.x32);
                        isAssetsChanged = true;
                    }
                    resolve();
                }));
            });

            await Promise.all(promises);

            if (!!isAssetsChanged) {
                await riseRefVersion(request.client, RefTypes.ASSETS);
            }
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Error in delete assets. ${err}`,
                    }
                ]
            }
        }

        try {
            await deleteNodesChain(product.joint);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Error in delete joint node. ${err}`,
                    }
                ]
            };
        }

        try {
            const ref = await riseRefVersion(request.client, RefTypes.PRODUCTS);
            return {
                meta: { ref }
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