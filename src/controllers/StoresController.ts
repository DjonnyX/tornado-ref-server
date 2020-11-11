import { RefTypes, IStore, StoreModel } from "../models";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatStoreModel } from "../utils/store";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";

interface IStoreItem extends IStore {
    id?: string;
}

interface IStoreMeta {
    ref: IRefItem;
}

interface IStoresResponse {
    meta?: IStoreMeta;
    data?: Array<IStoreItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IStoreResponse {
    meta?: IStoreMeta;
    data?: IStoreItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IStoreCreateRequest {
    active?: boolean;
    name: string;
    address: string | null;
    terminals: Array<string> | null;
    employes: Array<string> | null;
    extra?: { [key: string]: any } | null;
}

interface IStoreUpdateRequest {
    active?: boolean;
    name?: string;
    address?: string;
    terminals: Array<string> | null;
    employes: Array<string> | null;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: IStoreItem = {
    active: true,
    name: "My store",
    address: "Moscow",
    terminals: [
        "a0830860-d869-4d31-837f-122097f75f4a",
        "2aff85fb-2316-4554-869c-df2ecd9126e9",
    ],
    employes: [
        "a0830860-d869-4d31-837f-122097f75f4a",
        "2aff85fb-2316-4554-869c-df2ecd9126e9",
    ],
    extra: {
        key: "value",
    }
};

const META_TEMPLATE: IStoreMeta = {
    ref: {
        name: RefTypes.STORES,
        version: 1,
        lastupdate: new Date(),
    }
};

@Route("/stores")
@Tags("Store")
export class StoresController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<IStoresResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<IStoresResponse> {
        try {
            const items = await StoreModel.find({ $client: request.client.id });
            const ref = await getRef(request.client.id, RefTypes.STORES);
            return {
                meta: { ref },
                data: items.map(v => formatStoreModel(v))
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

@Route("/store")
@Tags("Store")
export class StoreController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<IStoreResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IStoreResponse> {
        try {
            const item = await StoreModel.findById(id);
            const ref = await getRef(request.client.id, RefTypes.STORES);
            return {
                meta: { ref },
                data: formatStoreModel(item),
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
    @Example<IStoreResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IStoreCreateRequest, @Request() request: IAuthRequest): Promise<IStoreResponse> {
        try {
            const item = new StoreModel({ ...body, $client: request.client.id });
            const savedItem = await item.save();
            const ref = await riseRefVersion(request.client.id, RefTypes.STORES);
            return {
                meta: { ref },
                data: formatStoreModel(savedItem),
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
    @Example<IStoreResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IStoreUpdateRequest, @Request() request: IAuthRequest): Promise<IStoreResponse> {
        try {
            const item = await StoreModel.findById(id);

            for (const key in body) {
                item[key] = body[key];
                if (key === "extra") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(request.client.id, RefTypes.STORES);
            return {
                meta: { ref },
                data: formatStoreModel(item),
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
    @Example<IStoreResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IStoreResponse> {
        let bp: IStore;
        try {
            bp = await StoreModel.findByIdAndDelete(id);
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
            const ref = await riseRefVersion(request.client.id, RefTypes.STORES);
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