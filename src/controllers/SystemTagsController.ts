import { SystemTagModel } from "../models";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatSystemTagModel } from "../utils/systemTag";
import { IAuthRequest } from "../interfaces";
import { IRef, ISystemTag, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";

interface ISystemTagItem extends ISystemTag { }

interface ISystemTagMeta {
    ref: IRef;
}

interface ISystemTagsResponse {
    meta?: ISystemTagMeta;
    data?: Array<ISystemTagItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISystemTagResponse {
    meta?: ISystemTagMeta;
    data?: ISystemTagItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISystemTagCreateRequest {
    name: string;
    extra?: { [key: string]: any } | null;
}

interface ISystemTagUpdateRequest {
    name?: string;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ISystemTagItem = {
    name: "My system tag",
    extra: {
        key: "value",
    }
};

const META_TEMPLATE: ISystemTagMeta = {
    ref: {
        name: RefTypes.SYSTEM_TAGS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/system-tags")
@Tags("SystemTag")
export class SystemTagsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<ISystemTagsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<ISystemTagsResponse> {
        try {
            const items = await findAllWithFilter(SystemTagModel.find({ client: request.account.id }), request);
            const ref = await getRef(request.account.id, RefTypes.SYSTEM_TAGS);
            return {
                meta: { ref },
                data: items.map(v => formatSystemTagModel(v))
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

@Route("/system-tag")
@Tags("SystemTag")
export class SystemTagController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<ISystemTagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<ISystemTagResponse> {
        try {
            const item = await SystemTagModel.findById(id);
            const ref = await getRef(request.account.id, RefTypes.SYSTEM_TAGS);
            return {
                meta: { ref },
                data: formatSystemTagModel(item),
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
    @Example<ISystemTagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: ISystemTagCreateRequest, @Request() request: IAuthRequest): Promise<ISystemTagResponse> {
        try {
            const item = new SystemTagModel({ ...body, client: request.account.id });
            const savedItem = await item.save();
            const ref = await riseRefVersion(request.account.id, RefTypes.SYSTEM_TAGS);
            return {
                meta: { ref },
                data: formatSystemTagModel(savedItem),
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
    @OperationId("Update")
    @Example<ISystemTagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: ISystemTagUpdateRequest, @Request() request: IAuthRequest): Promise<ISystemTagResponse> {
        try {
            const item = await SystemTagModel.findById(id);

            for (const key in body) {
                item[key] = body[key];
                if (key === "extra") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(request.account.id, RefTypes.SYSTEM_TAGS);
            return {
                meta: { ref },
                data: formatSystemTagModel(item),
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
    @Example<ISystemTagResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<ISystemTagResponse> {
        let bp: ISystemTag;
        try {
            bp = await SystemTagModel.findByIdAndDelete(id);
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
            const ref = await riseRefVersion(request.account.id, RefTypes.STORES);
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