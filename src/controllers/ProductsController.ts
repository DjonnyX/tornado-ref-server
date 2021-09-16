import { ProductModel, IProductDocument, IReceiptItem, NodeModel, ILanguageDocument, LanguageModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { deleteNodesChain } from "../utils/node";
import { formatProductModel } from "../utils/product";
import { getEntityAssets, getDeletedImagesFromDifferense, normalizeContents, sortEntities, formatEntityPositionModel } from "../utils/entity";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { IAuthRequest } from "../interfaces";
import { IEntityPosition, IPrice, IProduct, IProductContents, IRef, NodeTypes, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";

export interface IProductItem extends IProduct { }

export interface IProductsMeta {
    ref: IRef;
}

interface IProductsPositionsResponse {
    meta?: IProductsMeta;
    data?: Array<IEntityPosition>;
    error?: Array<{
        code: number;
        message: string;
    }>;
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
    contents?: IProductContents | any;
    prices: Array<IPrice>;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    weight?: number;
    systemTag?: string | null;
    joint?: string;
    extra?: { [key: string]: any } | null;
}

interface IProductUpdateRequest {
    active?: boolean;
    position?: number;
    contents?: IProductContents | any;
    prices?: Array<IPrice>;
    receipt?: Array<IReceiptItem>;
    tags?: Array<string>;
    weight?: number;
    systemTag?: string | null;
    joint?: string;
    extra?: { [key: string]: any } | null;
}

export const RESPONSE_TEMPLATE: IProductItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    position: 0,
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
            gallery: ["gt7h7f79bcf86cd7994f9d6u", "g8h07f79bcf86cd7994f9d7k",],
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
    weight: 100,
    systemTag: "78y7ggb28fb28bf2873b7f3",
    joint: "df3c7f79bcf86cd7994f9d8f",
    extra: { key: "value" },
};

const META_TEMPLATE: IProductsMeta = {
    ref: {
        name: RefTypes.PRODUCTS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/products")
@Tags("Product")
export class ProductsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<IProductsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<IProductsResponse> {
        const client = getClientId(request);
        try {
            const items = await findAllWithFilter(ProductModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.PRODUCTS);
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

    @Put("/positions")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("SetPositions")
    @Example<IProductsPositionsResponse>({
        meta: META_TEMPLATE,
        data: [{
            id: "32r23f232f334f34f43f",
            position: 0,
        }],
    })
    public async positions(@Body() body: Array<IEntityPosition>, @Request() request: IAuthRequest): Promise<IProductsPositionsResponse> {
        const client = getClientId(request);
        try {
            const items: Array<IProductDocument> = await findAllWithFilter(ProductModel.find({ client }), request);

            const positionsDictionary: { [id: string]: number } = {};
            body.forEach(pos => {
                positionsDictionary[pos.id] = pos.position;
            });

            const promises = new Array<Promise<IProductDocument>>();
            items.forEach(item => {
                const pos = positionsDictionary[item.id];
                if (pos !== undefined) {
                    item.position = pos;
                    promises.push(item.save());
                }
            });

            await Promise.all(promises);

            const ref = await getRef(client, RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: items.map(v => formatEntityPositionModel(v)),
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<IProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IProductResponse> {
        try {
            const item = await ProductModel.findById(id);
            const ref = await getRef(getClientId(request), RefTypes.PRODUCTS);
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
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<IProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IProductCreateRequest, @Request() request: IAuthRequest): Promise<IProductResponse> {
        const client = getClientId(request);
        let positions: Array<IProductDocument>;
        try {
            positions = await ProductModel.find({ client });
        } catch (err) {

        }

        let params: IProductItem;
        try {

            // создается корневой нод
            const jointNode = new NodeModel({
                client,
                active: true,
                type: NodeTypes.PRODUCT_JOINT,
                parentId: null,
                contentId: null,
                children: [],
            });
            const jointRootNode = await jointNode.save();
            await riseRefVersion(client, RefTypes.NODES);

            params = {
                ...body,
                position: positions.length,
                client,
                joint: jointRootNode._id
            } as any;
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Error when creation joint node of Product. ${err}`,
                    }
                ]
            };
        }

        try {
            const item = new ProductModel(params);
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.PRODUCTS);
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
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<IProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IProductUpdateRequest, @Request() request: IAuthRequest): Promise<IProductResponse> {
        const client = getClientId(request);
        let defaultLanguage: ILanguageDocument;
        try {
            defaultLanguage = await LanguageModel.findOne({ client, isDefault: true });
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
            let isPositionsEqual = true;
            for (const key in body) {
                if (key === "position") {
                    isPositionsEqual = item.position === body[key];
                }

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
            const promises = new Array<Promise<void>>();
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
                await riseRefVersion(client, RefTypes.ASSETS);
            }

            // выставление ассетов от предыдущего состояния
            // ассеты неьзя перезаписывать напрямую!
            if (!!lastContents) {
                for (const lang in lastContents) {
                    if (!item.contents[lang]) {
                        item.contents[lang] = {} as any;
                    }
                    if (lastContents[lang]) {
                        item.contents[lang].assets = lastContents[lang].assets;
                    }
                }
            }

            await item.save();

            const positions1 = await ProductModel.find({ client });

            if (!isPositionsEqual) {
                await sortEntities(positions1);
            }

            const ref = await riseRefVersion(client, RefTypes.PRODUCTS);
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
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<IProductResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IProductResponse> {
        const client = getClientId(request);
        let product: IProductDocument;
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

        const promises = new Array<Promise<void>>();

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
                await riseRefVersion(client, RefTypes.ASSETS);
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
            const positions = await ProductModel.find({ client });
            sortEntities(positions);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Sort positions error. ${err}`,
                    }
                ]
            };
        }

        try {
            const ref = await riseRefVersion(client, RefTypes.PRODUCTS);
            return {
                meta: { ref },
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