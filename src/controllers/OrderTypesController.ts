import { RefTypes, IOrderType, OrderTypeModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatOrderTypeModel } from "../utils/orderType";

export interface IOrderTypeItem {
    id: string;
    active: boolean;
    name: string;
    description?: string;
    color?: string;
    assets?: Array<string>;
    images?: {
        main?: string | null;
        icon?: string | null;
    };
    extra?: { [key: string]: any } | null;
}

interface IOrderTypeMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface OrderTypesResponse {
    meta?: IOrderTypeMeta;
    data?: Array<IOrderTypeItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface OrderTypeResponse {
    meta?: IOrderTypeMeta;
    data?: IOrderTypeItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface OrderTypeCreateRequest {
    name: string;
    active: boolean;
    description: string;
    color?: string;
    assets?: Array<string>;
    images?: {
        main?: string | null;
        icon?: string | null;
    };
    extra?: { [key: string]: any } | null;
}

const META_TEMPLATE: IOrderTypeMeta = {
    ref: {
        name: RefTypes.ORDER_TYPES,
        version: 1,
        lastUpdate: 1589885721,
    }
};

export const RESPONSE_TEMPLATE: IOrderTypeItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    name: "Take away",
    description: "description",
    color: "#000000",
    assets: [
        "gt7h7f79bcf86cd7994f9d6u",
        "gt7h7f79bcf86cd7994f9d6u",
    ],
    images: {
        main: "gt7h7f79bcf86cd7994f9d6u",
        icon: "gt7h7f79bcf86cd7994f9d6u",
    },
    extra: { key: "value" },
};

@Route("/order-types")
@Tags("OrderType")
export class OrderTypesController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<OrderTypesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(): Promise<OrderTypesResponse> {
        try {
            const items = await OrderTypeModel.find({});
            const ref = await getRef(RefTypes.ORDER_TYPES);
            return {
                meta: { ref },
                data: items.map(v => formatOrderTypeModel(v)),
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

@Route("/order-type")
@Tags("OrderType")
export class OrderTypeController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string): Promise<OrderTypeResponse> {
        try {
            const item = await OrderTypeModel.findById(id);
            const ref = await getRef(RefTypes.ORDER_TYPES);
            return {
                meta: { ref },
                data: formatOrderTypeModel(item),
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
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: OrderTypeCreateRequest): Promise<OrderTypeResponse> {
        try {
            const item = new OrderTypeModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.ORDER_TYPES);
            return {
                meta: { ref },
                data: formatOrderTypeModel(savedItem),
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
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: OrderTypeCreateRequest): Promise<OrderTypeResponse> {
        try {
            const item = await OrderTypeModel.findById(id);

            for (const key in request) {
                item[key] = request[key];
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.ORDER_TYPES);
            return {
                meta: { ref },
                data: formatOrderTypeModel(item),
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
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string): Promise<OrderTypeResponse> {
        try {
            await OrderTypeModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.ORDER_TYPES);
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