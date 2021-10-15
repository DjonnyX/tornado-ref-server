import { NodeModel, INodeDocument } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import * as joi from "@hapi/joi";
import { getNodesChain, deleteNodesChain, checkOnRecursion, formatModel } from "../utils/node";
import { IAuthRequest } from "../interfaces";
import { IScenario, NodeTypes, ScenarioCommonActionTypes, RefTypes, IRef, INode } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";

interface INodeItem extends INode { }

interface INodesMeta {
    ref: IRef;
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

interface ICreateNodesResponse {
    meta?: INodesMeta;
    data?: {
        /**
         * измененный нод
         */
        changed: Array<INodeItem>;
        /**
         * созданный ребенок
         */
        created: Array<INodeItem>;
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

interface INodesCreateRequest {
    nodes: Array<{
        type: NodeTypes;
        active: boolean;
        parentId: string;
        contentId: string;
        children: Array<string>;
        scenarios: Array<IScenario>;
        extra?: { [key: string]: any } | null;
    }>;
}

interface INodeUpdateRequest {
    type?: NodeTypes;
    active?: boolean;
    parentId?: string | null;
    contentId?: string | null;
    children?: Array<string>;
    scenarios?: Array<IScenario>;
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
        lock: false,
        action: ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
    }]
};

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
    @Security("integrationAccessToken")
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
                lock: false,
                action: ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
            }]
        }]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<INodesResponse> {
        const client = getClientId(request);

        try {
            const items = await NodeModel.find({ client, type: NodeTypes.KIOSK_ROOT });
            const ref = await getRef(client, RefTypes.NODES);
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
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<INodesResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(NodeModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.NODES);
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
    @Security("integrationAccessToken")
    @OperationId("GetAllById")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAllById(id: string, @Request() request: IAuthRequest): Promise<INodesResponse> {
        const client = getClientId(request);

        try {
            const items = await getNodesChain(id);
            const ref = await getRef(client, RefTypes.NODES);
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

    @Post()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("CreateMany")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async createMany(@Body() body: INodesCreateRequest, @Request() request: IAuthRequest): Promise<ICreateNodesResponse> {
        const client = getClientId(request);

        const promises = new Array<Promise<INodeDocument>>();

        for (let i = 0, l = body.nodes.length; i < l; i++) {
            const node = body.nodes[i];
            if (node.type === NodeTypes.SELECTOR_NODE) {
                const hasRecursion = await checkOnRecursion(client, node.parentId, node.contentId);
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

            if (node.type === NodeTypes.SELECTOR_NODE && !!node.children && node.children.length > 0) {
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

            const item = new NodeModel({ ...node, client });
            promises.push(item.save());
        }

        let savedItems: Array<INodeDocument>;
        try {
            savedItems = await Promise.all(promises);
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

        let ref: IRef;
        try {
            ref = await riseRefVersion(client, RefTypes.NODES);
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

        const promises1 = new Array<Promise<INodeDocument>>();

        for (let i = 0, l = savedItems.length; i < l; i++) {
            const node = savedItems[i]
            const parentNode = await NodeModel.findOne({ client, _id: node.parentId });
            parentNode.children.push(node._id);
            promises1.push(parentNode.save());
        }

        let parentNodes: Array<INodeDocument>;
        try {
            parentNodes = await Promise.all(promises1);
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
                changed: parentNodes.map(n => formatModel(n)),
                created: savedItems.map(n => formatModel(n)),
            }
        };
    }
}

@Route("/node")
@Tags("Node")
export class NodeController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<INodeResponse> {
        const client = getClientId(request);

        try {
            const item = await NodeModel.findById(id);
            const ref = await getRef(client, RefTypes.NODES);
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
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() body: INodeCreateRequest, @Request() request: IAuthRequest): Promise<ICreateNodeResponse> {
        const client = getClientId(request);

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
            const hasRecursion = await checkOnRecursion(client, body.parentId, body.contentId);
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

        let savedItem: INodeDocument;
        try {
            const item = new NodeModel({ ...body, client });
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

        let ref: IRef;
        try {
            ref = await riseRefVersion(client, RefTypes.NODES);
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

        let parentNode: INodeDocument;

        try {
            parentNode = await NodeModel.findOne({ client, _id: savedItem.parentId });
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
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() body: INodeUpdateRequest, @Request() request: IAuthRequest): Promise<INodeResponse> {
        const client = getClientId(request);

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
            const hasRecursion = await checkOnRecursion(client, body.parentId, body.contentId);
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

            const ref = await riseRefVersion(client, RefTypes.NODES);
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
    @Example<INodeResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IDeleteNodeResponse> {
        const client = getClientId(request);

        let ids: Array<string>;

        let parentNode: INodeDocument;
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
            const ref = await riseRefVersion(client, RefTypes.NODES);
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
