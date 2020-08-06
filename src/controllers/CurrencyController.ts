import { RefTypes, ICurrency, CurrencyModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";

interface ICurrencyItem {
    id: string;
    code: string;
    name: string;
    symbol: string;
    extra?: { [key: string]: any } | null;
}

interface ICurrencyMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface CurrenciesResponse {
    meta?: ICurrencyMeta;
    data?: Array<ICurrencyItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface CurrencyResponse {
    meta?: ICurrencyMeta;
    data?: ICurrencyItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface CurrencyCreateRequest {
    active: boolean;
    name: string;
    description?: string;
    color: string;
}

const RESPONSE_TEMPLATE: ICurrencyItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    code: "RUB",
    name: "Рубль",
    symbol: "₽",
    extra: { key: "value" },
};

const formatModel = (model: ICurrency) => ({
    id: model._id,
    code: model.code,
    name: model.name,
    symbol: model.symbol,
    extra: model.extra,
});

const META_TEMPLATE: ICurrencyMeta = {
    ref: {
        name: RefTypes.CURRENCIES,
        version: 1,
        lastUpdate: 1589885721,
    }
};

@Route("/currencies")
@Tags("Currency")
export class CurrenciesController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<CurrenciesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(): Promise<CurrenciesResponse> {
        try {
            const items = await CurrencyModel.find({});
            const ref = await getRef(RefTypes.CURRENCIES);
            return {
                meta: { ref },
                data: items.map(v => formatModel(v)),
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

@Route("/currency")
@Tags("Currency")
export class CurrencyController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<CurrencyResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string): Promise<CurrencyResponse> {
        try {
            const item = await CurrencyModel.findById(id);
            const ref = await getRef(RefTypes.CURRENCIES);
            return {
                meta: { ref },
                data: formatModel(item),
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
    @Example<CurrencyResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: CurrencyCreateRequest): Promise<CurrencyResponse> {
        try {
            const item = new CurrencyModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.CURRENCIES);
            return {
                meta: { ref },
                data: formatModel(savedItem),
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
    @Example<CurrencyResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: CurrencyCreateRequest): Promise<CurrencyResponse> {
        try {
            const item = await CurrencyModel.findById(id);

            for (const key in request) {
                item[key] = request[key];
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.CURRENCIES);
            return {
                meta: { ref },
                data: formatModel(item),
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
    @Example<CurrencyResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string): Promise<CurrencyResponse> {
        try {
            await CurrencyModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.CURRENCIES);
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