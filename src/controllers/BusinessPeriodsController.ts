import { BusinessPeriodModel } from "../models";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatModel } from "../utils/businessPeriod";
import { IAuthRequest } from "../interfaces";
import { IBusinessPeriod, IBusinessPeriodContents, IRef, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";

export interface IScheduleItem {
    active: boolean;
    time?: {
        start: number;
        end: number;
    };
    weekDays?: number[];
    extra?: {
        [key: string]: any;
    } | null;
}

export interface IBusinessPeriodItem {
    id: string;
    active: boolean;
    contents: IBusinessPeriodContents;
    schedule: Array<IScheduleItem>;
    extra?: {
        [key: string]: any;
    } | null;
}

interface IBusinessPeriodMeta {
    ref: IRef;
}

interface IBusinessPeriodsResponse {
    meta?: IBusinessPeriodMeta;
    data?: Array<IBusinessPeriodItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IBusinessPeriodResponse {
    meta?: IBusinessPeriodMeta;
    data?: IBusinessPeriodItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IBusinessPeriodCreateRequest {
    active: boolean;
    name?: string;
    contents?: IBusinessPeriodContents | any;
    schedule?: Array<IScheduleItem>;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: IBusinessPeriodItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    contents: {
        "RU": {
            name: "Business period",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        }
    },
    schedule: [
        {
            active: true,
            time: {
                start: Date.now(),
                end: Date.now(),
            },
            weekDays: [0, 1, 2],
        }
    ],
    extra: {
        key: "value",
    }
};

const META_TEMPLATE: IBusinessPeriodMeta = {
    ref: {
        name: RefTypes.BUSINESS_PERIODS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/business-periods")
@Tags("Business Period")
export class BusinessPeriodsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<IBusinessPeriodsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<IBusinessPeriodsResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(BusinessPeriodModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.BUSINESS_PERIODS);
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

@Route("/business-period")
@Tags("Business Period")
export class BusinessPeriodController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IBusinessPeriodResponse> {
        const client = getClientId(request);

        try {
            const item = await BusinessPeriodModel.findById(id);
            const ref = await getRef(client, RefTypes.BUSINESS_PERIODS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IBusinessPeriodCreateRequest, @Request() request: IAuthRequest): Promise<IBusinessPeriodResponse> {
        const client = getClientId(request);

        try {
            const item = new BusinessPeriodModel({ ...body, client });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.BUSINESS_PERIODS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IBusinessPeriodCreateRequest, @Request() request: IAuthRequest): Promise<IBusinessPeriodResponse> {
        const client = getClientId(request);

        try {
            const item = await BusinessPeriodModel.findById(id);

            for (const key in body) {
                item[key] = body[key];
                if (key === "extra" || key === "contents") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(client, RefTypes.BUSINESS_PERIODS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IBusinessPeriodResponse> {
        const client = getClientId(request);

        let bp: IBusinessPeriod;
        try {
            bp = await BusinessPeriodModel.findByIdAndDelete(id);
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
            const ref = await riseRefVersion(client, RefTypes.BUSINESS_PERIODS);
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