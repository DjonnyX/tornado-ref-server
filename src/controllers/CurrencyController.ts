import { RefTypes, CurrencyModel, ICurrency } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatCurrencyModel } from "../utils/currency";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";

interface ICurrencyItem {
    id: string;
    isDefault: boolean;
    active: boolean;
    code: string;
    name: string;
    symbol: string;
    extra?: { [key: string]: any } | null;
}

interface ICurrencyMeta {
    ref: IRefItem;
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
    active?: boolean;
    isDefault: boolean;
    code: string;
    name: string;
    symbol: string;
    extra?: { [key: string]: any } | null;
}

interface CurrencyUpdateRequest {
    active?: boolean;
    isDefault: boolean;
    code?: string;
    name?: string;
    symbol?: string;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ICurrencyItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    isDefault: true,
    active: true,
    code: "RUB",
    name: "Рубль",
    symbol: "₽",
    extra: { key: "value" },
};

const META_TEMPLATE: ICurrencyMeta = {
    ref: {
        name: RefTypes.CURRENCIES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/currencies")
@Tags("Currency")
export class CurrenciesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<CurrenciesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<CurrenciesResponse> {
        try {
            const items = await CurrencyModel.find({ client: request.client.id });
            const ref = await getRef(request.client.id, RefTypes.CURRENCIES);
            return {
                meta: { ref },
                data: items.map(v => formatCurrencyModel(v)),
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<CurrencyResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<CurrencyResponse> {
        try {
            const item = await CurrencyModel.findById(id);
            const ref = await getRef(request.client.id, RefTypes.CURRENCIES);
            return {
                meta: { ref },
                data: formatCurrencyModel(item),
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
    @Example<CurrencyResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: CurrencyCreateRequest, @Request() request: IAuthRequest): Promise<CurrencyResponse> {
        let currencies: Array<ICurrency>;

        try {
            currencies = await CurrencyModel.find({ client: request.client.id });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get currencies error. ${err}`,
                    }
                ]
            };
        }

        try {
            body.isDefault = currencies.length === 0;
            const item = new CurrencyModel({ ...body, client: request.client.id });
            const savedItem = await item.save();
            const ref = await riseRefVersion(request.client.id, RefTypes.CURRENCIES);
            return {
                meta: { ref },
                data: formatCurrencyModel(savedItem),
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
    @Example<CurrencyResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: CurrencyUpdateRequest, @Request() request: IAuthRequest): Promise<CurrencyResponse> {
        let item: ICurrency;

        let isDefault: boolean;

        let currencyCode: string;

        try {
            item = await CurrencyModel.findById(id);

            for (const key in body) {
                item[key] = body[key];

                if (key === "code") {
                    currencyCode = body[key];
                }

                if (key === "extra") {
                    item.markModified(key);
                }
            }
            isDefault = item.isDefault;

            await item.save();
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
            const currencies: Array<ICurrency> = await CurrencyModel.find({ client: request.client.id });

            const promises = new Array<Promise<void>>();

            if (isDefault) {
                currencies.forEach(currency => {
                    if (currency.code !== currencyCode) {
                        if (!!currency.isDefault) {
                            currency.isDefault = false;
                            promises.push(new Promise<void>(async (resolve, reject) => {
                                try {
                                    await currency.save();
                                } catch (err) {
                                    reject(err);
                                }
                                resolve();
                            }));
                        }
                    }
                });
            } else {
                let needSetupDefault = true;
                let firstCurrency: ICurrency;

                currencies.forEach(currency => {
                    if (!firstCurrency) {
                        firstCurrency = currency;
                    }

                    if (currency.isDefault) {
                        needSetupDefault = false;
                    }
                });

                if (needSetupDefault && firstCurrency) {
                    firstCurrency.isDefault = true;

                    promises.push(new Promise<void>(async (resolve, reject) => {
                        try {
                            await firstCurrency.save();
                        } catch (err) {
                            reject(err);
                        }
                        resolve();
                    }));
                }
            }

            await Promise.all(promises);

        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Set default language error. ${err}`,
                    }
                ]
            };
        }

        try {
            await item.save();

            const ref = await riseRefVersion(request.client.id, RefTypes.CURRENCIES);
            return {
                meta: { ref },
                data: formatCurrencyModel(item),
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
    @Example<CurrencyResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<CurrencyResponse> {
        let currencies: Array<ICurrency>;
        try {
            currencies = await CurrencyModel.find({ client: request.client.id });
        } catch (err) { }

        if (currencies && currencies.length === 1) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "There must be at least one currency left.",
                    }
                ]
            };
        }

        try {
            await CurrencyModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(request.client.id, RefTypes.CURRENCIES);
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