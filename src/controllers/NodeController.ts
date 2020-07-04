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
interface IDeleteNodeResponse {
    meta?: INodesMeta;
    data?: Array<string>;
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

const formatModel = (model: INode) => ({
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

/**
 * Возвращает список всех дочерних нодов.
 * Сбор нодов происходит от последних элементов в цепи.
 */
const getNodesChain = async (id: string): Promise<Array<INode>> => {
    let result = new Array<INode>();

    let item: INode;
    try {
        item = await NodeModel.findById(id);
    } catch (err) {
        throw Error(`Can not be found not with id: ${id}. ${err}`);
    }

    for (let i = 0, l = item.children.length; i < l; i++) {
        const childId = item.children[i];

        const childrenNodes = await getNodesChain(childId);
        result = [...result, ...childrenNodes];
    }

    result.push(item);

    return result;
};

/**
 * Возвращает список id's удаленных нодов (с учетом детей).
 * Удаление происходит от последних элементов в цепи, тем самым,
 * если в процессе возникнет exception, то "открепленных" от цепи нодов не образуется!
 */
const deleteNodesChain = async (id: string): Promise<Array<string>> => {
    const result = new Array<string>();

    const nodes = await getNodesChain(id);

    for (let i = 0, l = nodes.length; i < l; i++) {
        const node = nodes[i];

        try {
            await NodeModel.findByIdAndDelete(node.id);
        } catch (err) {
            throw Error(`Can not be deleted not with id: ${node.id}. ${err}`);
        }

        result.push(node.id);
    }

    return result;
};

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
    public async create(@Body() request: INodeCreateRequest): Promise<INodeResponse> {
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

        try {
            const parentNode = await NodeModel.findOne({ _id: savedItem.parentId });
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
            data: formatModel(savedItem)
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
        try {
            const item = await NodeModel.findOneAndUpdate({ _id: id }, request);
            const ref = await riseRefVersion(RefTypes.NODES);
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

    @Delete("{id}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<INodeResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<IDeleteNodeResponse> {
        let ids: Array<string>;

        try {
            ids = await deleteNodesChain(id);
            const ref = await riseRefVersion(RefTypes.NODES);
            return {
                meta: { ref },
                data: ids,
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