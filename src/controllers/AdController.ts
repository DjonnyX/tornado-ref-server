import { AdModel, RefTypes } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatAdModel } from "../utils/ad";
import { IAdContents } from "../models/Ad";

interface IAdItem {
    id: string;
    active: boolean;
    contents: IAdContents;
    extra?: { [key: string]: any } | null;
}

interface IAdsMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface AdsResponse {
    meta?: IAdsMeta;
    data?: Array<IAdItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface AdResponse {
    meta?: IAdsMeta;
    data?: IAdItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface AdCreateRequest {
    active: boolean;
    name: string;
    description?: string;
    color: string;
    images?: {
        main: string;
    };
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: IAdItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    contents: {
        "RU": {
            name: "Ad",
            color: "0x000fff",
            assets: ["gt7h7f79bcf86cd7994f9d6u"],
            images: {
                main: "gt7h7f79bcf86cd7994f9d6u",
            },
        }
    },
    extra: { key: "value" },
};

const META_TEMPLATE: IAdsMeta = {
    ref: {
        name: RefTypes.ADS,
        version: 1,
        lastUpdate: 1589885721,
    }
};

@Route("/ads")
@Tags("Ad")
export class AdsController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<AdsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(): Promise<AdsResponse> {
        try {
            const items = await AdModel.find({});
            const ref = await getRef(RefTypes.ADS);
            return {
                meta: { ref },
                data: items.map(v => formatAdModel(v)),
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

@Route("/ad")
@Tags("Ad")
export class AdController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<AdResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string): Promise<AdResponse> {
        try {
            const item = await AdModel.findById(id);
            const ref = await getRef(RefTypes.ADS);
            return {
                meta: { ref },
                data: formatAdModel(item),
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
    @Example<AdResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: AdCreateRequest): Promise<AdResponse> {
        try {
            const item = new AdModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.ADS);
            return {
                meta: { ref },
                data: formatAdModel(savedItem),
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
    @Example<AdResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: AdCreateRequest): Promise<AdResponse> {
        try {
            const item = await AdModel.findById(id);

            for (const key in request) {
                item[key] = request[key];
                if (key === "extra" || key === "content") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.ADS);
            return {
                meta: { ref },
                data: formatAdModel(item),
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
    @Example<AdResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string): Promise<AdResponse> {
        try {
            await AdModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.ADS);
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