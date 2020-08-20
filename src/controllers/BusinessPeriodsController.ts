import { RefTypes, ISchedule, IBusinessPeriod, BusinessPeriodModel } from "../models";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import * as joi from "@hapi/joi";
import { getRef, riseRefVersion } from "../db/refs";
import { formatModel } from "../utils/businessPeriod";

interface IBusinessPeriodItem {
    id?: string;
    active: boolean;
    name: string;
    description?: string;
    schedule: Array<ISchedule>;
    extra?: { [key: string]: any } | null;
}

interface IBusinessPeriodMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
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
    name: string;
    description?: string;
    schedule: Array<ISchedule>;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: IBusinessPeriodItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    name: "Selectors on concert",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
        name: joi.string(),
        description: joi.optional(),
        schedule: joi.optional(),
        extra: joi.optional(),
    });

    return schema.validate(node);
};

const META_TEMPLATE: IBusinessPeriodMeta = {
    ref: {
        name: RefTypes.BUSINESS_PERIODS,
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/business-periods")
@Tags("Business Periods")
export class BusinessPeriodsController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<IBusinessPeriodsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<IBusinessPeriodsResponse> {
        try {
            const items = await BusinessPeriodModel.find({});
            const ref = await getRef(RefTypes.BUSINESS_PERIODS);
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
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string): Promise<IBusinessPeriodResponse> {
        try {
            const item = await BusinessPeriodModel.findById(id);
            const ref = await getRef(RefTypes.BUSINESS_PERIODS);
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
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: IBusinessPeriodCreateRequest): Promise<IBusinessPeriodResponse> {
        const validation = validateBP(request);
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
            const item = new BusinessPeriodModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.BUSINESS_PERIODS);
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
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: IBusinessPeriodCreateRequest): Promise<IBusinessPeriodResponse> {
        const validation = validateBP(request);
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
            
            for (const key in request) {
                item[key] = request[key];
                if (key === "extra") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.BUSINESS_PERIODS);
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
    @Example<IBusinessPeriodResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<IBusinessPeriodResponse> {
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
            const ref = await riseRefVersion(RefTypes.BUSINESS_PERIODS);
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