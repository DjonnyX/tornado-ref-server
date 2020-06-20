import { NodeModel, INode } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes } from "src/models/enums";

interface INodeItem {
    id: string;
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

interface NodesResponse {
    meta?: INodesMeta;
    data?: Array<INodeItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface NodeResponse {
    meta?: INodesMeta;
    data?: INodeItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface NodeCreateRequest {
    type: NodeTypes;
    parentId: string;
    contentId: string;
    children: Array<string>;
}

const RESPONSE_TEMPLATE: INodeItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    parentId: "107c7f79bcf86cd7994f6c0e",
    contentId: "407c7f79bcf86cd7994f6c0e",
    children: ["123c7f79bcf86cd7994f6c0e"],
};

const formatModel = (model: INode) => ({
    id: model._id,
    parentId: model.parentId,
    contentId: model.contentId,
    children: model.children,
});

const META_TEMPLATE: INodesMeta = {
    ref: {
        name: "Nodes",
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/Nodes")
@Tags("Node")
export class NodesController extends Controller {
    @Get()
    @Security("jwt")
    @OperationId("GetAll")
    @Example<NodesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<NodesResponse> {
        try {
            const items = await NodeModel.find({});
            const ref = await getRef("Nodes");
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
    @Example<NodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string): Promise<NodeResponse> {
        try {
            const item = await NodeModel.findById(id);
            const ref = await getRef("Nodes");
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
    @Example<NodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() request: NodeCreateRequest): Promise<NodeResponse> {
        try {
            const item = new NodeModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion("Nodes");
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
    @Example<NodeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() request: NodeCreateRequest): Promise<NodeResponse> {
        try {
            const item = await NodeModel.findOneAndUpdate({ id }, request);
            const ref = await riseRefVersion("Nodes");
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
    @Example<NodeResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<NodeResponse> {
        try {
            await NodeModel.findOneAndDelete({ id });
            const ref = await riseRefVersion("Nodes");
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