import { NodeModel, INode } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import * as joi from "@hapi/joi";
import { IRefItem } from "./RefsController";
import { getNodesChain, deleteNodesChain, checkOnRecursion } from "../utils/node";
import { IAuthRequest } from "../interfaces";
import { IScenario, NodeTypes, ScenarioCommonActionTypes, RefTypes } from "@djonnyx/tornado-types";

interface INodeItem {
    id: string;
    active: boolean,
    type: NodeTypes;
    parentId: string;
    contentId: string;
    children: Array<string>;
    scenarios?: Array<IScenario>;
    extra?: { [key: string]: any } | null;
}

interface INodesMeta {
    ref: IRefItem;
}

interface INodesResponse {
    meta?: INodesMeta;
    data?: Array<INodeItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface INodeResponse {
    meta?: INodesMeta;
    data?: INodeItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ICreateNodeResponse {
    meta?: INodesMeta;
    data?: {
        /**
         * измененный нод
         */
        changed: INodeItem;
        /**
         * созданный ребенок
         */
        created: INodeItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IDeleteNodeResponse {
    meta?: INodesMeta;
    data?: {
        /**
         * измененный нод
         */
        changed: INodeItem;
        /**
         * удаленные ноды
         */
        deleted: Array<string>;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface INodeCreateRequest {
    type: NodeTypes;
    active: boolean;
    parentId: string;
    contentId: string;
    children: Array<string>;
    scenarios: Array<IScenario>;
    extra?: { [key: string]: any } | null;
}

interface INodeUpdateRequest {
    type: NodeTypes;
    active: boolean;
    parentId: string | null;
    contentId: string | null;
    children: Array<string>;
    scenarios: Array<IScenario>;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: INodeItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    type: NodeTypes.SELECTOR,
    parentId: "107c7f79bcf86cd7994f6c0e",
    contentId: "407c7f79bcf86cd7994f6c0e",
    children: ["123c7f79bcf86cd7994f6c0e"],
    scenarios: [{
        active: true,
        action: ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
    }]
};

const formatModel = (model: INode): INodeItem => ({
    id: model._id,
    active: model.active,
    type: model.type,
    parentId: model.parentId,
    contentId: model.contentId,
    children: model.children || [],
    scenarios: model.scenarios.map(scenario => {
        return {
            active: scenario.active,
            action: scenario.action,
            value: scenario.value,
            extra: scenario.extra,
        }
    }) || [],
    extra: model.extra,
});

const META_TEMPLATE: INodesMeta = {
    ref: {
        name: RefTypes.NODES,
        version: 1,
        lastUpdate: new Date(),
    }
};

const validateCreateNode = (node: INodeCreateRequest): joi.ValidationResult => {
    const schema = joi.object({
        type: joi.string().pattern(new RegExp(`^(${NodeTypes.PRODUCT}|${NodeTypes.SELECTOR}|${NodeTypes.SELECTOR_NODE})$`)),
        active: joi.boolean(),
        parentId: joi.string().required(),
        contentId: joi.string().required(),
        children: joi.required(),
        scenarios: joi.optional(),
        extra: joi.optional(),
    });

    return schema.validate(node);
};

// часть валидируемых параметров убрана, для того чтобы работала сортировка детей
const validateUpdateNode = (node: INodeUpdateRequest): joi.ValidationResult => {
    const schema = joi.object({
        type: joi.string()
            // включен полный список для сортировки
            .pattern(new RegExp(`^(${NodeTypes.PRODUCT}|${NodeTypes.SELECTOR}|${NodeTypes.KIOSK_PRESETS_ROOT}|${NodeTypes.KIOSK_ROOT}|${NodeTypes.SELECTOR_JOINT}|${NodeTypes.PRODUCT_JOINT}|${NodeTypes.SELECTOR_NODE})$`)),
        active: joi.boolean(),
        parentId: joi.optional(), // для рутовых элементов
        contentId: joi.optional(), // для рутовых элементов
        children: joi.required(),
        scenarios: joi.optional(),
        extra: joi.optional(),
    });

    return schema.validate(node);
};

@Route("/root-nodes")
@Tags("Node")
export class RootNodesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetRootNodes")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [{
            id: "507c7f79bcf86cd7994f6c0e",
            active: true,
            type: NodeTypes.KIOSK_ROOT,
            parentId: "107c7f79bcf86cd7994f6c0e",
            contentId: "407c7f79bcf86cd7994f6c0e",
            children: ["123c7f79bcf86cd7994f6c0e"],
            scenarios: [{
                active: true,
                action: ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
            }]
        }]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<INodesResponse> {
        try {
            const items = await NodeModel.find({ client: request.account.id, type: NodeTypes.KIOSK_ROOT });
            const ref = await getRef(request.account.id, RefTypes.NODES);
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

@Route("/nodes")
@Tags("Node")
export class NodesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<INodesResponse> {
        try {
            const items = await NodeModel.find({ client: request.account.id });
            const ref = await getRef(request.account.id, RefTypes.NODES);
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

    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAllById")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAllById(id: string, @Request() request: IAuthRequest): Promise<INodesResponse> {
        try {
            const items = await getNodesChain(id);
            const ref = await getRef(request.account.id, RefTypes.NODES);
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

@Route("/node")
@Tags("Node")
export class NodeController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<INodeResponse> {
        try {
            const item = await NodeModel.findById(id);
            const ref = await getRef(request.account.id, RefTypes.NODES);
            return {
                meta: { ref },
                data: formatModel(item)
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
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() body: INodeCreateRequest, @Request() request: IAuthRequest): Promise<ICreateNodeResponse> {
        const validation = validateCreateNode(body);
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

        if (body.type === NodeTypes.SELECTOR_NODE) {
            const hasRecursion = await checkOnRecursion(request.account.id, body.parentId, body.contentId);
            if (hasRecursion) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: "Invalid combination. Probably recursion.",
                        }
                    ]
                };
            }
        }

        if (body.type === NodeTypes.SELECTOR_NODE && !!body.children && body.children.length > 0) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "Node with type SELECTOR_NODE can not be contains children",
                    }
                ]
            };
        }

        let savedItem: INode;
        try {
            const item = new NodeModel({ ...body, client: request.account.id });
            savedItem = await item.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not be save node. ${err}`,
                    }
                ]
            };
        }

        let ref: IRefItem;
        try {
            ref = await riseRefVersion(request.account.id, RefTypes.NODES);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not be bumped version for node ref. ${err}`,
                    }
                ]
            };
        }

        let parentNode: INode;

        try {
            parentNode = await NodeModel.findOne({ client: request.account.id, _id: savedItem.parentId });
            parentNode.children.push(savedItem._id);
            await parentNode.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not be setted children for parent node. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: { ref },
            data: {
                changed: formatModel(parentNode),
                created: formatModel(savedItem),
            }
        };
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() body: INodeUpdateRequest, @Request() request: IAuthRequest): Promise<INodeResponse> {
        const validation = validateUpdateNode(body);
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

        if (body.type === NodeTypes.SELECTOR_NODE) {
            const hasRecursion = await checkOnRecursion(request.account.id, body.parentId, body.contentId);
            if (hasRecursion) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: "Invalid combination. Probably recursion.",
                        }
                    ]
                };
            }
        }

        if (body.type === NodeTypes.SELECTOR_NODE && !!body.children && body.children.length > 0) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "Node with type SELECTOR_NODE can not be contains children",
                    }
                ]
            };
        }

        try {
            const item = await NodeModel.findById(id);

            for (const key in body) {
                if (key === "extra") {
                    item[key] = body[key];
                    item.markModified(key);
                } else
                    if (key === "scenarios") {
                        const scenarios = body.scenarios.map(scenario => ({
                            active: scenario.active,
                            action: scenario.action,
                            value: scenario.value,
                            extra: scenario.extra,
                        }));
                        item["scenarios"] = scenarios;
                    } else {
                        item[key] = body[key];
                    }
            }

            if (item.type === NodeTypes.SELECTOR_NODE && !!body.children && body.children.length > 0) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: "Node with type SELECTOR_NODE can not be contains children",
                        }
                    ]
                };
            }

            await item.save();

            const ref = await riseRefVersion(request.account.id, RefTypes.NODES);
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
    @OperationId("Delete")
    @Example<INodeResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IDeleteNodeResponse> {
        let ids: Array<string>;

        let parentNode: INode;
        try {
            const item = await NodeModel.findById(id);
            parentNode = await NodeModel.findById(item.parentId);

            const ind = parentNode.children.indexOf(id);
            if (ind > -1) {
                parentNode.children.splice(ind, 1);
            }

            await parentNode.save();
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
            ids = await deleteNodesChain(id);
            const ref = await riseRefVersion(request.account.id, RefTypes.NODES);
            return {
                meta: { ref },
                data: {
                    deleted: ids,
                    changed: formatModel(parentNode),
                },
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
