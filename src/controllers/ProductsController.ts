import { ProductModel, IProduct, IReceiptItem, RefTypes, NodeModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes } from "../models/enums";
import { deleteNodesChain } from "../utils/node";
import { formatProductModel } from "../utils/product";

export interface IProductItem {
    id?: string;
    active: boolean;
    name: string;
    description?: string;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    joint?: string;
    assets?: Array<string>;
    mainAsset?: string;
    extra?: { [key: string]: any } | null;
}

export interface IProductsMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
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
    name: string;
    active: boolean;
    description?: string;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    joint?: string;
    assets?: Array<string>;
    mainAsset?: string;
    extra?: { [key: string]: any } | null;
}

export const RESPONSE_TEMPLATE: IProductItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    name: "Products on concert",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
    assets: ["g8h07f79bcf86cd7994f9d7k",],
    mainAsset: "g8h07f79bcf86cd7994f9d7k",
    joint: "df3c7f79bcf86cd7994f9d8f",
    extra: { key: "value" },
};

const META_TEMPLATE: IProductsMeta = {
    ref: {
        name: RefTypes.PRODUCTS,
        version: 1,
        lastUpdate: 1589885721,
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
    public async getAll(): Promise<IProductsResponse> {
        try {
            const items = await ProductModel.find({});
            const ref = await getRef(RefTypes.PRODUCTS);
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
    public async getOne(id: string): Promise<IProductResponse> {
        try {
            const item = await ProductModel.findById(id);
            const ref = await getRef(RefTypes.PRODUCTS);
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
    public async create(@Body() request: IProductCreateRequest): Promise<IProductResponse> {
        let params: IProductItem;
        try {

            // создается корневой нод
            const jointNode = new NodeModel({
                active: true,
                type: NodeTypes.PRODUCT_JOINT,
                parentId: null,
                contentId: null,
                children: [],
            });
            const jointRootNode = await jointNode.save();

            params = { ...request, joint: jointRootNode._id };
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
            const ref = await riseRefVersion(RefTypes.PRODUCTS);
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
    public async update(id: string, @Body() request: IProductCreateRequest): Promise<IProductResponse> {
        try {
            const item = await ProductModel.findById(id);

            for (const key in request) {
                item[key] = request[key];
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.PRODUCTS);
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
    public async delete(id: string): Promise<IProductResponse> {
        let product: IProduct;
        try {
            product = await ProductModel.findByIdAndDelete(id);
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
            const ref = await riseRefVersion(RefTypes.PRODUCTS);
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