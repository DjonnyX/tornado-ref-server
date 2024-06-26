import { CheckueModel, ICheckueDocument } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatCheckueModel } from "../utils/checkue";
import { IAuthRequest } from "../interfaces";
import { IRef, IScenario, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";

interface ICheckueItem {
    id: string;
    active: boolean;
    name: string;
    scenarios: Array<IScenario>;
    extra?: { [key: string]: any } | null;
}

interface ICheckueMeta {
    ref: IRef;
}

interface CheckuesResponse {
    meta?: ICheckueMeta;
    data?: Array<ICheckueItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface CheckueResponse {
    meta?: ICheckueMeta;
    data?: ICheckueItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface CheckueCreateRequest {
    active?: boolean;
    name: string;
    scenarios?: Array<IScenario>;
    extra?: { [key: string]: any } | null;
}

interface CheckueUpdateRequest {
    active?: boolean;
    name?: string;
    scenarios?: Array<IScenario>;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ICheckueItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    name: "Чек до 500р",
    scenarios: [],
    extra: { key: "value" },
};

const META_TEMPLATE: ICheckueMeta = {
    ref: {
        name: RefTypes.CHECKUES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/checkues")
@Tags("Checkue")
export class CheckuesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<CheckuesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<CheckuesResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(CheckueModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.CHECKUES);
            return {
                meta: { ref },
                data: items.map(v => formatCheckueModel(v)),
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get checkues error. ${err}`,
                    }
                ]
            };
        }
    }
}

@Route("/checkue")
@Tags("Checkue")
export class CheckueController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<CheckueResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<CheckueResponse> {
        const client = getClientId(request);

        try {
            const item = await CheckueModel.findById(id);
            const ref = await getRef(client, RefTypes.CHECKUES);
            return {
                meta: { ref },
                data: formatCheckueModel(item),
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get checkue error. ${err}`,
                    }
                ]
            };
        }
    }

    @Post()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<CheckueResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: CheckueCreateRequest, @Request() request: IAuthRequest): Promise<CheckueResponse> {
        const client = getClientId(request);

        const data = { ...body };
        if (!data.scenarios) {
            data.scenarios = [];
        }

        try {
            const item = new CheckueModel({ ...data, client });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.CHECKUES);
            return {
                meta: { ref },
                data: formatCheckueModel(savedItem),
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Create checkue error. ${err}`,
                    }
                ]
            };
        }
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<CheckueResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: CheckueUpdateRequest, @Request() request: IAuthRequest): Promise<CheckueResponse> {
        const client = getClientId(request);

        let item: ICheckueDocument;

        try {
            item = await CheckueModel.findById(id);

            for (const key in body) {
                if (key === "extra") {
                    item.extra = { ...item.extra, ...body[key] };
                    item.markModified(key);
                } else if (key === "scenarios") {
                    const scenarios = body.scenarios.map(scenario => ({
                        active: scenario.active,
                        lock: scenario.lock,
                        action: scenario.action,
                        value: scenario.value,
                        extra: scenario.extra,
                    }));
                    item["scenarios"] = scenarios;
                } else {
                    item[key] = body[key];
                }
            }

            await item.save();

            const ref = await riseRefVersion(client, RefTypes.CHECKUES);

            return {
                meta: { ref },
                data: formatCheckueModel(item),
            }
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Update checkue error. ${err}`,
                    }
                ]
            };
        }
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<CheckueResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<CheckueResponse> {
        const client = getClientId(request);

        try {
            await CheckueModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(client, RefTypes.CHECKUES);
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
                ],
            };
        }
    }
}