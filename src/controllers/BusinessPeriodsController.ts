import { RefTypes, ISchedule, IBusinessPeriod, BusinessPeriodModel } from "../models";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import * as joi from "@hapi/joi";
import { getRef, riseRefVersion } from "../db/refs";
import { formatModel } from "../utils/businessPeriod";
import { IBusinessPeriodContents } from "src/models/BusinessPeriod";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";

interface IBusinessPeriodItem {
    id?: string;
    name?: string;
    active: boolean;
    contents: IBusinessPeriodContents;
    schedule: Array<ISchedule>;
    extra?: { [key: string]: any } | null;
}

interface IBusinessPeriodMeta {
    ref: IRefItem;
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
    contents?: IBusinessPeriodContents;
    schedule: Array<ISchedule>;
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

const validateBP = (node: IBusinessPeriodCreateRequest): joi.ValidationResult => {
    const schema = joi.object({
        active: joi.boolean(),
        name: joi.optional(),
        contents: joi.optional(),
        schedule: joi.optional(),
        extra: joi.optional(),
    });

    return schema.validate(node);
};

const META_TEMPLATE: IBusinessPeriodMeta = {
    ref: {
        name: RefTypes.BUSINESS_PERIODS,
        version: 1,
        lastupdate: new Date(),
    }
};

@Route("/business-periods")
@Tags("Business Period")
export class BusinessPeriodsController extends Controller {
    @Get()
    @Security("clientToken")
    @Security("serverToken")
    @OperationId("GetAll")
    @Example<IBusinessPeriodsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<IBusinessPeriodsResponse> {
        try {
            const items = await BusinessPeriodModel.find({ client: request.client.id });
            const ref = await getRef(request.client.id, RefTypes.BUSINESS_PERIODS);
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
    @Security("clientToken")
    @Security("serverToken")
    @OperationId("GetOne")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IBusinessPeriodResponse> {
        try {
            const item = await BusinessPeriodModel.findById(id);
            const ref = await getRef(request.client.id, RefTypes.BUSINESS_PERIODS);
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
    @Security("clientToken")
    @OperationId("Create")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IBusinessPeriodCreateRequest, @Request() request: IAuthRequest): Promise<IBusinessPeriodResponse> {
        const validation = validateBP(body);
        if (validation.error) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: validation.error.message,
                    }
                ]
            };
        }

        try {
            const item = new BusinessPeriodModel({ ...body, client: request.client.id });
            const savedItem = await item.save();
            const ref = await riseRefVersion(request.client.id, RefTypes.BUSINESS_PERIODS);
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
    @Security("clientToken")
    @OperationId("Update")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IBusinessPeriodCreateRequest, @Request() request: IAuthRequest): Promise<IBusinessPeriodResponse> {
        const validation = validateBP(body);
        if (validation.error) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: validation.error.message,
                    }
                ]
            };
        }

        try {
            const item = await BusinessPeriodModel.findById(id);

            for (const key in body) {
                item[key] = body[key];
                if (key === "extra" || key === "contents") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(request.client.id, RefTypes.BUSINESS_PERIODS);
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
    @Security("clientToken")
    @OperationId("Delete")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IBusinessPeriodResponse> {
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
            const ref = await riseRefVersion(request.client.id, RefTypes.BUSINESS_PERIODS);
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