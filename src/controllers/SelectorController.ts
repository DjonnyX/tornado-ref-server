import { SelectorModel, ISelector, IReceiptItem, RefTypes } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";

interface ISelectorItem {
    id: string;
    name: string;
    description?: string;
    tags: Array<string>;
}

interface ISelectorsMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface SelectorsResponse {
    meta?: ISelectorsMeta;
    data?: Array<ISelectorItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface SelectorResponse {
    meta?: ISelectorsMeta;
    data?: ISelectorItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface SelectorCreateRequest {
    name: string;
    description?: string;
    schedule: Array<string>;
    tags: Array<string>;
}

const RESPONSE_TEMPLATE: ISelectorItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    name: "Selectors on concert",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tags: ["123c7f79bcf86cd7994f6c0e"],
};

const formatModel = (model: ISelector) => ({
    id: model._id,
    name: model.name,
    description: model.description,
    tags: model.tags || [],
});

const META_TEMPLATE: ISelectorsMeta = {
    ref: {
        name: RefTypes.SELECTORS,
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/selectors")
@Tags("Selector")
export class SelectorsController extends Controller {
    @Get()
    @Security("jwt")
    @OperationId("GetAll")
    @Example<SelectorsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<SelectorsResponse> {
        try {
            const items = await SelectorModel.find({});
            const ref = await getRef(RefTypes.SELECTORS);
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
    @Example<SelectorResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string): Promise<SelectorResponse> {
        try {
            const item = await SelectorModel.findById(id);
            const ref = await getRef(RefTypes.SELECTORS);
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
    @Example<SelectorResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() request: SelectorCreateRequest): Promise<SelectorResponse> {
        try {
            const item = new SelectorModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.SELECTORS);
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
    @Example<SelectorResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() request: SelectorCreateRequest): Promise<SelectorResponse> {
        try {
            const item = await SelectorModel.findOneAndUpdate({ id }, request);
            const ref = await riseRefVersion(RefTypes.SELECTORS);
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
    @Example<SelectorResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<SelectorResponse> {
        try {
            await SelectorModel.findOneAndDelete({ id });
            const ref = await riseRefVersion(RefTypes.SELECTORS);
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