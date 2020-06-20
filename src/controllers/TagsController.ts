import { TagModel, ITag } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";

interface ITagItem {
    id: string;
    name: string;
    description?: string;
    color: string;
}

interface ITagsMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface TagsResponse {
    meta: ITagsMeta;
    data: Array<ITagItem>;
}

interface TagResponse {
    meta: ITagsMeta;
    data?: ITagItem;
}

interface TagCreateRequest {
    name: string;
    description?: string;
    color: string;
}

const RESPONSE_TEMPLATE: ITagItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    name: "Morning Tag",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    color: "0x000fff"
};

const formatModel = (model: ITag) => ({
    id: model._id,
    name: model.name,
    description: model.description,
    color: model.color
});

const META_TEMPLATE: ITagsMeta = {
    ref: {
        name: "tags",
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/tags")
@Tags("Tag")
export class TagController extends Controller {
    @Get()
    @Security("jwt")
    @OperationId("GetAll")
    @Example<TagsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<TagsResponse> {
        try {
            const items = await TagModel.find({});
            const ref = await getRef("tags");
            return {
                meta: { ref },
                data: items.map(v => formatModel(v))
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }

    @Get("{id}")
    @Security("jwt")
    @OperationId("GetOne")
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string): Promise<TagResponse> {
        try {
            const item = await TagModel.findById(id);
            const ref = await getRef("tags");
            return {
                meta: { ref },
                data: formatModel(item)
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }

    @Post()
    @Security("jwt")
    @OperationId("Create")
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() request: TagCreateRequest): Promise<TagResponse> {
        try {
            const item = new TagModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion("tags");
            return {
                meta: { ref },
                data: formatModel(savedItem)
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }

    @Put("{id}")
    @Security("jwt")
    @OperationId("Update")
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() request: TagCreateRequest): Promise<TagResponse> {
        try {
            const item = await TagModel.findOneAndUpdate({ id }, request);
            const ref = await riseRefVersion("tags");
            return {
                meta: { ref },
                data: formatModel(item)
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }

    @Delete("{id}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<TagResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<TagResponse> {
        try {
            await TagModel.findOneAndDelete({ id });
            const ref = await riseRefVersion("tags");
            return {
                meta: { ref }
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }
}