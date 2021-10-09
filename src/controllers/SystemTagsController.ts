import { IProductDocument, ISelectorDocument, ISystemTagDocument, ProductModel, SelectorModel, SystemTagModel } from "../models";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatSystemTagModel } from "../utils/systemTag";
import { IAuthRequest } from "../interfaces";
import { IEntityPosition, IRef, ISystemTag, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";
import { formatEntityPositionModel, sortEntities } from "../utils/entity";

interface ISystemTagItem extends ISystemTag { }

interface ISystemTagMeta {
    ref: IRef;
}

interface ISystemTagsPositionsResponse {
    meta?: ISystemTagMeta;
    data?: Array<IEntityPosition>;
    error?: Array<{
        code: number;
        message: string;
    }>;
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
    position?: number;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ISystemTagItem = {
    name: "My system tag",
    position: 0,
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
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<ISystemTagsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<ISystemTagsResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(SystemTagModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.SYSTEM_TAGS);
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

    @Put("/positions")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("SetPositions")
    @Example<ISystemTagsPositionsResponse>({
        meta: META_TEMPLATE,
        data: [{
            id: "32r23f232f334f34f43f",
            position: 0,
        }],
    })
    public async positions(@Body() body: Array<IEntityPosition>, @Request() request: IAuthRequest): Promise<ISystemTagsPositionsResponse> {
        const client = getClientId(request);

        try {
            const items: Array<ISystemTagDocument> = await findAllWithFilter(SystemTagModel.find({ client }), request);

            const positionsDictionary: { [id: string]: number } = {};
            body.forEach(pos => {
                positionsDictionary[pos.id] = pos.position;
            });

            const promises = new Array<Promise<ISystemTagDocument>>();
            items.forEach(item => {
                const pos = positionsDictionary[item.id];
                if (pos !== undefined) {
                    item.position = pos;
                    promises.push(item.save());
                }
            });

            await Promise.all(promises);

            const ref = await getRef(client, RefTypes.SYSTEM_TAGS);
            return {
                meta: { ref },
                data: items.map(v => formatEntityPositionModel(v)),
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
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<ISystemTagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<ISystemTagResponse> {
        const client = getClientId(request);

        try {
            const item = await SystemTagModel.findById(id);
            const ref = await getRef(client, RefTypes.SYSTEM_TAGS);
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
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<ISystemTagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: ISystemTagCreateRequest, @Request() request: IAuthRequest): Promise<ISystemTagResponse> {
        const client = getClientId(request);

        let systemTags: Array<ISystemTagDocument>;
        try {
            systemTags = await SystemTagModel.find({ client });
        } catch (err) { }

        try {
            const existsItems = await SystemTagModel.find({ client, name: body.name }).where("extra.entity", body.extra?.entity);
            if (!!existsItems && existsItems.length > 0) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: `Tag with name "${body.name}" already exists.`,
                        }
                    ]
                };
            }
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
            const item = new SystemTagModel({ ...body, position: systemTags.length, client });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.SYSTEM_TAGS);
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
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<ISystemTagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: ISystemTagUpdateRequest, @Request() request: IAuthRequest): Promise<ISystemTagResponse> {
        const client = getClientId(request);

        try {
            const item = await SystemTagModel.findById(id);

            let isPositionsEqual = true;
            for (const key in body) {
                if (key === "position") {
                    isPositionsEqual = item.position === body[key];
                }

                item[key] = body[key];

                if (key === "extra") {
                    item.markModified(key);
                }
            }

            await item.save();

            const systemTags = await SystemTagModel.find({ client });

            if (!isPositionsEqual) {
                await sortEntities(systemTags);
            }

            const ref = await riseRefVersion(client, RefTypes.SYSTEM_TAGS);
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
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<ISystemTagResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<ISystemTagResponse> {
        const client = getClientId(request);

        let tag: ISystemTag;
        try {
            tag = await SystemTagModel.findByIdAndDelete(id);
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

        const promises = new Array<Promise<IProductDocument | ISelectorDocument>>();
        switch (tag.extra.entity) {
            case "product":
                try {
                    const products = await ProductModel.find({ client, systemTag: id });
                    for (let i = 0, l = products.length; i < l; i++) {
                        const product = products[i];
                        product.systemTag = undefined;
                        promises.push(product.save());
                    }
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
                break;
            case "selector":
                try {
                    const selectors = await SelectorModel.find({ client, systemTag: id });
                    for (let i = 0, l = selectors.length; i < l; i++) {
                        const selector = selectors[i];
                        selector.systemTag = undefined;
                        promises.push(selector.save());
                    }
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
                break;
        }

        try {
            await Promise.all(promises);
            switch (tag.extra.entity) {
                case "product":
                    await riseRefVersion(client, RefTypes.PRODUCTS);
                    break;
                case "selector":
                    await riseRefVersion(client, RefTypes.SELECTORS);
                    break;
            }

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
            const positions = await SystemTagModel.find({ client }).where("extra.entity", tag.extra?.entity);
            sortEntities(positions);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Sort positions error. ${err}`,
                    }
                ]
            };
        }

        try {
            const ref = await riseRefVersion(client, RefTypes.SYSTEM_TAGS);
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