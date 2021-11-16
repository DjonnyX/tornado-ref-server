import { WeightUnitModel, LanguageModel, ILanguageDocument } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatWeightUnitModel } from "../utils/weightUnit";
import { IWeightUnitDocument } from "../models/WeightInit";
import { normalizeContents } from "../utils/entity";
import { IAuthRequest } from "../interfaces";
import { IRef, IWeightUnit, IWeightUnitContents, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";
import { LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";

export interface IWeightUnitItem extends IWeightUnit { }

interface IWeightUnitMeta {
    ref: IRef;
}

interface WeightUnitsResponse {
    meta?: IWeightUnitMeta;
    data?: Array<IWeightUnitItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface WeightUnitResponse {
    meta?: IWeightUnitMeta;
    data?: IWeightUnitItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface WeightUnitCreateRequest {
    systemName?: string;
    contents?: IWeightUnitContents | any;
    extra?: { [key: string]: any } | null;
}

const META_TEMPLATE: IWeightUnitMeta = {
    ref: {
        name: RefTypes.WEIGHT_UNITS,
        version: 1,
        lastUpdate: new Date(),
    }
};

export const WEIGHT_UNIT_RESPONSE_TEMPLATE: IWeightUnitItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    systemName: "liters",
    contents: {
        [LANGUAGE_RESPONSE_TEMPLATE?.code]: {
            name: "л",
        }
    },
    extra: { key: "value" },
};

@Route("/weight-units")
@Tags("WeightUnit")
export class WeightUnitsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<WeightUnitsResponse>({
        meta: META_TEMPLATE,
        data: [WEIGHT_UNIT_RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<WeightUnitsResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(WeightUnitModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.WEIGHT_UNITS);
            return {
                meta: { ref },
                data: items.map(v => formatWeightUnitModel(v)),
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

@Route("/weight-unit")
@Tags("WeightUnit")
export class WeightUnitController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<WeightUnitResponse>({
        meta: META_TEMPLATE,
        data: WEIGHT_UNIT_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<WeightUnitResponse> {
        const client = getClientId(request);

        try {
            const item = await WeightUnitModel.findById(id);
            const ref = await getRef(client, RefTypes.WEIGHT_UNITS);
            return {
                meta: { ref },
                data: formatWeightUnitModel(item),
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
    @Example<WeightUnitResponse>({
        meta: META_TEMPLATE,
        data: WEIGHT_UNIT_RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: WeightUnitCreateRequest, @Request() request: IAuthRequest): Promise<WeightUnitResponse> {
        const client = getClientId(request);

        try {
            const item = new WeightUnitModel({ ...body, client });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.WEIGHT_UNITS);
            return {
                meta: { ref },
                data: formatWeightUnitModel(savedItem),
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
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<WeightUnitResponse>({
        meta: META_TEMPLATE,
        data: WEIGHT_UNIT_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: WeightUnitCreateRequest, @Request() request: IAuthRequest): Promise<WeightUnitResponse> {
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
            const item = await WeightUnitModel.findById(id);

            let lastContents: IWeightUnitContents;
            for (const key in body) {
                if (key === "contents") {
                    lastContents = item.contents;
                    item[key] = body[key];
                    normalizeContents(item.contents, defaultLanguage.code);
                    item.markModified(key);
                } else if (key === "extra") {
                    item[key] = body[key];
                    item.extra = { ...item.extra, ...body[key] };
                    item.markModified(key);
                } else {
                    item[key] = body[key];
                }
            }

            if (!!lastContents) {
                for (const lang in lastContents) {
                    if (!item.contents[lang]) {
                        item.contents[lang] = {
                            name: "unknown",
                        };
                    }
                }
            }

            await item.save();

            const ref = await riseRefVersion(client, RefTypes.SELECTORS);
            return {
                meta: { ref },
                data: formatWeightUnitModel(item),
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
    @Example<WeightUnitResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<WeightUnitResponse> {
        const client = getClientId(request);

        let weightUnit: IWeightUnitDocument;
        try {
            weightUnit = await WeightUnitModel.findByIdAndDelete(id);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find and delete weightUnit error. ${err}`,
                    }
                ]
            };
        }

        try {
            const ref = await riseRefVersion(client, RefTypes.WEIGHT_UNITS);
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