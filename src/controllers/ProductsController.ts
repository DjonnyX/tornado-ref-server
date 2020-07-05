import { ProductModel, IProduct, IReceiptItem, RefTypes, NodeModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes } from "../models/enums";

interface IProductItem {
    id?: string;
    name: string;
    description?: string;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    joint: string;
}

interface IProductsMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface ProductsResponse {
    meta?: IProductsMeta;
    data?: Array<IProductItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ProductResponse {
    meta?: IProductsMeta;
    data?: IProductItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ProductCreateRequest {
    name: string;
    description?: string;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
}

const RESPONSE_TEMPLATE: IProductItem = {
    id: "507c7f79bcf86cd7994f6c0e",
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
    joint: "df3c7f79bcf86cd7994f9d8f",
};

const formatModel = (model: IProduct) => ({
    id: model._id,
    name: model.name,
    description: model.description,
    receipt: model.receipt,
    tags: model.tags || [],
    joint: model.joint,
});

const META_TEMPLATE: IProductsMeta = {
    ref: {
        name: RefTypes.PRODUCTS,
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/products")
@Tags("Product")
export class ProductsController extends Controller {
    @Get()
    @Security("jwt")
    @OperationId("GetAll")
    @Example<ProductsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<ProductsResponse> {
        try {
            const items = await ProductModel.find({});
            const ref = await getRef(RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: items.map(v => formatModel(v))
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
    @OperationId("GetOne")
    @Example<ProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string): Promise<ProductResponse> {
        try {
            const item = await ProductModel.findById(id);
            const ref = await getRef(RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: formatModel(item)
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
    @Example<ProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() request: ProductCreateRequest): Promise<ProductResponse> {
        let params: IProductItem;
        try {

            // создается корневой нод
            const jointNode = new NodeModel({
                type: NodeTypes.PRODUCT_JOINT,
                parentId: null,
                contentId: null,
                children: [],
            });
            const jointRootNode = await jointNode.save();

            params = {...request, joint: jointRootNode._id};
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
                data: formatModel(savedItem)
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
    @Example<ProductResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() request: ProductCreateRequest): Promise<ProductResponse> {
        try {
            const item = await ProductModel.findById(id);
            item.name = request.name;
            item.description = request.description;
            item.receipt = request.receipt;
            item.tags = request.tags;
            
            await item.save();

            const ref = await riseRefVersion(RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: formatModel(item)
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
    @Example<ProductResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<ProductResponse> {
        try {
            await ProductModel.findOneAndDelete({ _id: id });
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