import { NodeModel, INode } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes, RefTypes } from "../models/enums";
import * as joi from "@hapi/joi";

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
        
        try {
            const item = new NodeModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.NODES);
            return {
                meta: { ref },
                data: formatModel(savedItem)
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
    public async delete(id: string): Promise<INodeResponse> {
        try {
            await NodeModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.NODES);
            return {
                meta: { ref }
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