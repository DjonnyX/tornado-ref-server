import { NodeModel, INode } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes, RefTypes } from "../models/enums";
import * as joi from "@hapi/joi";
import { IRefItem } from "./RefsController";

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
        type: joi.string().pattern(new RegExp(`^[${NodeTypes.PRODUCT}|${NodeTypes.SELECTOR}]`)),
        parentId: joi.string().required(),
        contentId: joi.string().required(),
        children: joi.required(),
    });

    return schema.validate(node);
};

interface IDictionary<T = any> {
    [_id: string]: T;
}

const getMapOfCollection = <T extends INode>(collection: Array<T>): IDictionary<T> => {
    const result: IDictionary<T> = {};

    collection.forEach(item => {
        result[item._id] = item;
    });

    return result;
};

const extractNodeChain = <T extends INode>(dictionary: IDictionary<T>, item: T): Array<T> => {
    let result = new Array<T>();

    item.children.forEach(id => {
        result = [...result, ...extractNodeChain<T>(dictionary, dictionary[id])];
    });

    result.push(item);

    return result;
};

/**
 * Возвращает список всех дочерних нодов.
 * Сбор нодов происходит от последних элементов в цепи.
 */
const getNodesChain = async (id: string): Promise<Array<INode>> => {
    let items: Array<INode>;
    try {
        items = await NodeModel.find();
    } catch (err) {
        throw Error(`Can not be found nodes. ${err}`);
    }

    const dictionary = getMapOfCollection(items);

    const rootChainNode = dictionary[id];
    const result = extractNodeChain(dictionary, rootChainNode);

    return result;
};

/**
 * Возвращает список id's удаленных нодов (с учетом детей).
 * Удаление происходит от последних элементов в цепи, тем самым,
 * если в процессе возникнет exception, то "открепленных" от цепи нодов не образуется!
 */
const deleteNodesChain = async (id: string): Promise<Array<string>> => {
    const nodes = await getNodesChain(id);

    const ids = nodes.map(item => item.id);

    try {
        await NodeModel.deleteMany({ _id: ids });
    } catch (err) {
        throw Error(`Can not be deleted not with id. ${err}`);
    }

    return ids;
};

@Route("/root-nodes")
@Tags("Root nodes")
export class RootNodesController extends Controller {
    @Get()
    @Security("jwt")
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
    public async update(id: string, @Body() request: INodeCreateRequest): Promise<INodeResponse> {
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

        try {
            const item = await NodeModel.findById(id);
            item.contentId = request.contentId;
            item.type = request.type;

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