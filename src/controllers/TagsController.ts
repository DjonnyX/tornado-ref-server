import { TagModel, ITag, RefTypes } from "../models/index";
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
    meta?: ITagsMeta;
    data?: Array<ITagItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface TagResponse {
    meta?: ITagsMeta;
    data?: ITagItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
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
        name: RefTypes.TAGS,
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/tags")
@Tags("Tag")
export class TagsController extends Controller {
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
            const ref = await getRef(RefTypes.TAGS);
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

@Route("/tag")
@Tags("Tag")
export class TagController extends Controller {
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
            const ref = await getRef(RefTypes.TAGS);
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
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() request: TagCreateRequest): Promise<TagResponse> {
        try {
            const item = new TagModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.TAGS);
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
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() request: TagCreateRequest): Promise<TagResponse> {
        try {
            const item = await TagModel.findById(id);
            
            for (const key in request) {
                item[key] = request[key];
            }
            
            await item.save();

            const ref = await riseRefVersion(RefTypes.TAGS);
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
    @Example<TagResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<TagResponse> {
        try {
            await TagModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.TAGS);
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