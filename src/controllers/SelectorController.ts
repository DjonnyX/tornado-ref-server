import { SelectorModel, ISelector, RefTypes, NodeModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Query } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes } from "../models/enums";
import { deleteNodesChain } from "../utils/node";
import { SelectorTypes } from "../models/enums/SelectorTypes";
import { formatSelectorModel } from "../utils/selector";

export interface ISelectorItem {
    id?: string;
    type: SelectorTypes;
    active: boolean;
    name: string;
    color?: string;
    description?: string;
    joint: string;
    assets?: Array<string>;
    images?: {
        main: string | null;
        thumbnail: string | null;
        icon: string | null;
    };
    extra?: { [key: string]: any } | null;
}

interface ISelectorsMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface ISelectorsResponse {
    meta?: ISelectorsMeta;
    data?: Array<ISelectorItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorResponse {
    meta?: ISelectorsMeta;
    data?: ISelectorItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorCreateRequest {
    active: boolean;
    type: SelectorTypes;
    name: string;
    color?: string;
    description?: string;
    assets?: Array<string>;
    images?: {
        main: string | null;
        thumbnail: string | null;
        icon: string | null;
    };
    extra?: { [key: string]: any } | null;
}

interface ISelectorUpdateRequest {
    active?: boolean;
    type?: SelectorTypes;
    name?: string;
    color?: string;
    description?: string;
    assets?: Array<string>;
    images?: {
        main: string | null;
        thumbnail: string | null;
        icon: string | null;
    };
    extra?: { [key: string]: any } | null;
}

export const SELECTOR_RESPONSE_TEMPLATE: ISelectorItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    type: SelectorTypes.MENU_CATEGORY,
    name: "Selectors on concert",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    joint: "890c7f79bcf86cd7994f3t8y",
    assets: ["g8h07f79bcf86cd7994f9d7k"],
    images: {
        main: "g8h07f79bcf86cd7994f9d7k",
        thumbnail: "g8h07f79bcf86cd7994f9d7k",
        icon: "k7h97f79bcf86cd7994f0i9e",
    },
    extra: { key: "value" }
};

const META_TEMPLATE: ISelectorsMeta = {
    ref: {
        name: RefTypes.SELECTORS,
        version: 1,
        lastUpdate: 1589885721,
    }
};

@Route("/selectors")
@Tags("Selector")
export class SelectorsController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<ISelectorsResponse>({
        meta: META_TEMPLATE,
        data: [SELECTOR_RESPONSE_TEMPLATE],
    })
    public async getAll(@Query() type?: SelectorTypes): Promise<ISelectorsResponse> {
        try {
            const findParams: any = {};
            if (!!type) {
                findParams.type = type;
            }
            const items = await SelectorModel.find(findParams);
            const ref = await getRef(RefTypes.SELECTORS);
            return {
                meta: { ref },
                data: items.map(v => formatSelectorModel(v)),
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

@Route("/selector")
@Tags("Selector")
export class SelectorController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<ISelectorResponse>({
        meta: META_TEMPLATE,
        data: SELECTOR_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string): Promise<ISelectorResponse> {
        try {
            const item = await SelectorModel.findById(id);
            const ref = await getRef(RefTypes.SELECTORS);
            return {
                meta: { ref },
                data: formatSelectorModel(item),
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
    @Example<ISelectorResponse>({
        meta: META_TEMPLATE,
        data: SELECTOR_RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: ISelectorCreateRequest): Promise<ISelectorResponse> {
        let params: ISelectorItem;
        try {

            // создается корневой нод
            const jointNode = new NodeModel({
                active: true,
                type: NodeTypes.SELECTOR_JOINT,
                parentId: null,
                contentId: null,
                children: [],
            });
            const savedJointNode = await jointNode.save();

            params = { ...request, joint: savedJointNode._id };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Error in creation joint node. ${err}`,
                    }
                ]
            };
        }

        try {
            const item = new SelectorModel(params);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.SELECTORS);
            return {
                meta: { ref },
                data: formatSelectorModel(savedItem),
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
    @Example<ISelectorResponse>({
        meta: META_TEMPLATE,
        data: SELECTOR_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: ISelectorUpdateRequest): Promise<ISelectorResponse> {
        try {
            const item = await SelectorModel.findById(id);

            for (const key in request) {
                item[key] = request[key];
                if (key === "extra" || key === "content") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.SELECTORS);
            return {
                meta: { ref },
                data: formatSelectorModel(item),
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
    @Example<ISelectorResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string): Promise<ISelectorResponse> {
        let selector: ISelector;
        try {
            selector = await SelectorModel.findByIdAndDelete(id);
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
            await deleteNodesChain(selector.joint);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Error in delete joint node. ${err}`,
                    }
                ]
            };
        }

        try {
            const ref = await riseRefVersion(RefTypes.SELECTORS);
            return {
                meta: { ref },
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