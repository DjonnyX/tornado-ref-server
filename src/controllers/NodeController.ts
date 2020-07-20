import { NodeModel, INode } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes, RefTypes } from "../models/enums";
import * as joi from "@hapi/joi";
import { IRefItem } from "./RefsController";
import { getNodesChain, deleteNodesChain, checkOnRecursion } from "../utils/node";

interface INodeItem {
    id: string;
    type: NodeTypes;
    parentId: string;
    contentId: string;
    children: Array<string>;
}

interface INodesMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
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
    parentId: string;
    contentId: string;
    children: Array<string>;
}

interface INodeUpdateRequest {
    type: NodeTypes;
    parentId: string | null;
    contentId: string | null;
    children: Array<string>;
}

const RESPONSE_TEMPLATE: INodeItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    type: NodeTypes.SELECTOR,
    parentId: "107c7f79bcf86cd7994f6c0e",
    contentId: "407c7f79bcf86cd7994f6c0e",
    children: ["123c7f79bcf86cd7994f6c0e"],
};

const formatModel = (model: INode): INodeItem => ({
    id: model._id,
    type: model.type,
    parentId: model.parentId,
    contentId: model.contentId,
    children: model.children || [],
});

const META_TEMPLATE: INodesMeta = {
    ref: {
        name: RefTypes.NODES,
        version: 1,
        lastUpdate: 1589885721
    }
};

const validateCreateNode = (node: INodeCreateRequest): joi.ValidationResult => {
    const schema = joi.object({
        type: joi.string().pattern(new RegExp(`^(${NodeTypes.PRODUCT}|${NodeTypes.SELECTOR})$`)),
        parentId: joi.string().required(),
        contentId: joi.string().required(),
        children: joi.required(),
    });

    return schema.validate(node);
};

// часть валидируемых параметров убрана, для того чтобы работала сортировка детей
const validateUpdateNode = (node: INodeUpdateRequest): joi.ValidationResult => {
    const schema = joi.object({
        type: joi.string()
            // включен полный список для сортировки
            .pattern(new RegExp(`^(${NodeTypes.PRODUCT}|${NodeTypes.SELECTOR}|${NodeTypes.KIOSK_PRESETS_ROOT}|${NodeTypes.KIOSK_ROOT}|${NodeTypes.SELECTOR_JOINT}|${NodeTypes.PRODUCT_JOINT}|${NodeTypes.SELECTOR_NODE})$`)),
        parentId: joi.optional(), // для рутовых элементов
        contentId: joi.optional(), // для рутовых элементов
        children: joi.required(),
    });

    return schema.validate(node);
};

@Route("/root-nodes")
@Tags("Root nodes")
export class RootNodesController extends Controller {
    @Get()
    @Security("jwt")
    @Security("aoiKey")
    @OperationId("GetRootNodes")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [{
            id: "507c7f79bcf86cd7994f6c0e",
            type: NodeTypes.KIOSK_ROOT,
            parentId: "107c7f79bcf86cd7994f6c0e",
            contentId: "407c7f79bcf86cd7994f6c0e",
            children: ["123c7f79bcf86cd7994f6c0e"],
        }]
    })
    public async getAll(): Promise<INodesResponse> {
        try {
            const items = await NodeModel.find({ type: NodeTypes.KIOSK_ROOT });
            const ref = await getRef(RefTypes.NODES);
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
    @Security("jwt")
    @Security("aoiKey")
    @OperationId("GetAll")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<INodesResponse> {
        try {
            const items = await NodeModel.find({});
            const ref = await getRef(RefTypes.NODES);
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
    @Security("jwt")
    @Security("aoiKey")
    @OperationId("GetAllById")
    @Example<INodesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAllById(id: string): Promise<INodesResponse> {
        try {
            const items = await getNodesChain(id);
            const ref = await getRef(RefTypes.NODES);
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
    @Security("jwt")
    @Security("aoiKey")
    @OperationId("GetOne")
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string): Promise<INodeResponse> {
        try {
            const item = await NodeModel.findById(id);
            const ref = await getRef(RefTypes.NODES);
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
    @Security("jwt")
    @OperationId("Create")
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() request: INodeCreateRequest): Promise<ICreateNodeResponse> {
        const validation = validateCreateNode(request);
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

        if (request.type === NodeTypes.SELECTOR_NODE) {
            const hasRecursion = await checkOnRecursion(request.parentId, request.contentId);
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

        if (request.type === NodeTypes.SELECTOR_NODE && !!request.children && request.children.length > 0) {
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
            const item = new NodeModel(request);
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
            ref = await riseRefVersion(RefTypes.NODES);
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
            parentNode = await NodeModel.findOne({ _id: savedItem.parentId });
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
    @Security("jwt")
    @OperationId("Update")
    @Example<INodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() request: INodeUpdateRequest): Promise<INodeResponse> {
        const validation = validateUpdateNode(request);
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

        if (request.type === NodeTypes.SELECTOR_NODE) {
            const hasRecursion = await checkOnRecursion(request.parentId, request.contentId);
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

        if (request.type === NodeTypes.SELECTOR_NODE && !!request.children && request.children.length > 0) {
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
            
            for (const key in request) {
                item[key] = request[key];
            }

            if (item.type === NodeTypes.SELECTOR_NODE && !!request.children && request.children.length > 0) {
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

            const ref = await riseRefVersion(RefTypes.NODES);
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
    @Example<INodeResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<IDeleteNodeResponse> {
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
            const ref = await riseRefVersion(RefTypes.NODES);
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
