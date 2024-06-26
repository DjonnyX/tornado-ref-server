import { StoreModel } from "../models";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatStoreModel } from "../utils/store";
import { IAuthRequest } from "../interfaces";
import { IRef, IStore, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";

interface IStoreItem extends IStore { }

interface IStoreMeta {
    ref: IRef;
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
    name: string;
    address: string | null;
    extra?: { [key: string]: any } | null;
}

interface IStoreUpdateRequest {
    name?: string;
    address?: string;
    extra?: { [key: string]: any } | null;
}

export const STORE_RESPONSE_TEMPLATE: IStoreItem = {
    id: "566c7f79bcf86cd7994f6c1e",
    name: "My store",
    address: "Moscow",
    extra: {
        key: "value",
    }
};

const META_TEMPLATE: IStoreMeta = {
    ref: {
        name: RefTypes.STORES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/stores")
@Tags("Store")
export class StoresController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<IStoresResponse>({
        meta: META_TEMPLATE,
        data: [STORE_RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<IStoresResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(StoreModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.STORES);
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<IStoreResponse>({
        meta: META_TEMPLATE,
        data: STORE_RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IStoreResponse> {
        const client = getClientId(request);

        try {
            const item = await StoreModel.findById(id);
            const ref = await getRef(client, RefTypes.STORES);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<IStoreResponse>({
        meta: META_TEMPLATE,
        data: STORE_RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IStoreCreateRequest, @Request() request: IAuthRequest): Promise<IStoreResponse> {
        const client = getClientId(request);

        try {
            const item = new StoreModel({ ...body, client });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.STORES);
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<IStoreResponse>({
        meta: META_TEMPLATE,
        data: STORE_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IStoreUpdateRequest, @Request() request: IAuthRequest): Promise<IStoreResponse> {
        const client = getClientId(request);

        try {
            const item = await StoreModel.findById(id);

            for (const key in body) {
                item[key] = body[key];
                if (key === "extra") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(client, RefTypes.STORES);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<IStoreResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IStoreResponse> {
        const client = getClientId(request);

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
            const ref = await riseRefVersion(client, RefTypes.STORES);
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