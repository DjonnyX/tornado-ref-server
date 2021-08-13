import { SelectorModel, ISelectorDocument, NodeModel, ILanguageDocument, LanguageModel, INodeDocument } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Query, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { deleteNodesChain } from "../utils/node";
import { formatSelectorModel } from "../utils/selector";
import { normalizeContents, getDeletedImagesFromDifferense, getEntityAssets } from "../utils/entity";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { IAuthRequest } from "../interfaces";
import { ISelectorContents, NodeTypes, SelectorTypes, RefTypes, IRef, ISelector } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";

export interface ISelectorItem extends ISelector { }

interface ISelectorsMeta {
    ref: IRef;
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
    systemTag?: string;
    contents?: ISelectorContents | any;
    extra?: { [key: string]: any } | null;
}

interface ISelectorUpdateRequest {
    active?: boolean;
    type?: SelectorTypes;
    systemTag: string;
    contents?: ISelectorContents | any;
    extra?: { [key: string]: any } | null;
}

export const RESPONSE_TEMPLATE: ISelectorItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    type: SelectorTypes.MENU_CATEGORY,
    systemTag: "17h97f79bcf86cd7994f0i9e",
    contents: {
        "RU": {
            name: "Selectors on concert",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            color: "#000000",
            resources: {
                main: "g8h07f79bcf86cd7994f9d7k",
                icon: "k7h97f79bcf86cd7994f0i9e",
            },
            assets: ["g8h07f79bcf86cd7994f9d7k"],
        }
    },
    joint: "890c7f79bcf86cd7994f3t8y",
    extra: { key: "value" }
};

const META_TEMPLATE: ISelectorsMeta = {
    ref: {
        name: RefTypes.SELECTORS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/selectors")
@Tags("Selector")
export class SelectorsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<ISelectorsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<ISelectorsResponse> {
        try {
            const items = await findAllWithFilter(SelectorModel.find({ client: getClientId(request) }), request);
            const ref = await getRef(getClientId(request), RefTypes.SELECTORS);
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<ISelectorResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<ISelectorResponse> {
        try {
            const item = await SelectorModel.findById(id);
            const ref = await getRef(getClientId(request), RefTypes.SELECTORS);
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
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<ISelectorResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: ISelectorCreateRequest, @Request() request: IAuthRequest): Promise<ISelectorResponse> {
        let params: ISelectorItem;

        let jointNode: INodeDocument;

        if (body.type === SelectorTypes.SCHEMA_CATEGORY) {
            try {
                // создается корневой нод
                jointNode = new NodeModel({
                    client: getClientId(request),
                    active: true,
                    type: NodeTypes.SELECTOR_JOINT,
                    parentId: null,
                    contentId: null,
                    children: [],
                });
                const savedJointNode = await jointNode.save();

                params = {
                    ...body,
                    joint: savedJointNode._id,
                    client: getClientId(request),
                } as any;
            } catch (err) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: `Error in creation joint node of selector. ${err}`,
                        }
                    ]
                };
            }
        } else {
            params = {
                ...body,
                client: getClientId(request),
            } as any;
        }

        try {
            const item = new SelectorModel(params);

            const savedItem = await item.save();
            if (!!jointNode) {
                jointNode.contentId = item.id;
                await jointNode.save();
                await riseRefVersion(getClientId(request), RefTypes.NODES);
            }

            const ref = await riseRefVersion(getClientId(request), RefTypes.SELECTORS);
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
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<ISelectorResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: ISelectorUpdateRequest, @Request() request: IAuthRequest): Promise<ISelectorResponse> {
        let defaultLanguage: ILanguageDocument;
        try {
            defaultLanguage = await LanguageModel.findOne({ client: getClientId(request), isDefault: true });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Default language error. ${err}`,
                    }
                ]
            };
        }

        try {
            const item = await SelectorModel.findById(id);

            let lastContents: ISelectorContents;
            for (const key in body) {
                if (key === "joint") {
                    continue;
                }

                if (key === "contents") {
                    lastContents = item.contents;
                }

                item[key] = body[key];

                if (key === "extra" || key === "contents") {
                    if (key === "contents") {
                        normalizeContents(item.contents, defaultLanguage.code);
                    }
                    item.markModified(key);
                }
            }

            // удаление ассетов из разности resources
            const deletedAssetsFromImages = getDeletedImagesFromDifferense(lastContents, item.contents);
            const promises = new Array<Promise<void>>();
            let isAssetsChanged = false;
            deletedAssetsFromImages.forEach(assetId => {
                promises.push(new Promise(async (resolve, reject) => {
                    // удаление из списка assets
                    if (item.contents) {
                        for (const lang in item.contents) {
                            const content = item.contents[lang];
                            if (!!content && !!content.assets) {
                                const index = content.assets.indexOf(assetId);
                                if (index !== -1) {
                                    content.assets.splice(index, 1);
                                }
                            }
                        }
                    }

                    // физическое удаление asset'а
                    const asset = await AssetModel.findByIdAndDelete(assetId);
                    if (!!asset) {
                        await deleteAsset(asset.path);
                        await deleteAsset(asset.mipmap.x128);
                        await deleteAsset(asset.mipmap.x32);
                        isAssetsChanged = true;
                    }
                    resolve();
                }));
            });
            await Promise.all(promises);

            if (isAssetsChanged) {
                await riseRefVersion(getClientId(request), RefTypes.ASSETS);
            }

            // выставление ассетов от предыдущего состояния
            // ассеты неьзя перезаписывать напрямую!
            if (!!lastContents) {
                for (const lang in lastContents) {
                    if (!item.contents[lang]) {
                        item.contents[lang] = {} as any;
                    }
                    if (lastContents[lang]) {
                        item.contents[lang].assets = lastContents[lang].assets;
                    }
                }
            }

            await item.save();

            const ref = await riseRefVersion(getClientId(request), RefTypes.SELECTORS);
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
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<ISelectorResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<ISelectorResponse> {
        let selector: ISelectorDocument;
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

        // нужно удалять ассеты
        const assetsList = getEntityAssets(selector);

        const promises = new Array<Promise<void>>();

        try {
            let isAssetsChanged = false;
            assetsList.forEach(assetId => {
                promises.push(new Promise(async (resolve) => {
                    const asset = await AssetModel.findByIdAndDelete(assetId);
                    if (!!asset) {
                        await deleteAsset(asset.path);
                        await deleteAsset(asset.mipmap.x128);
                        await deleteAsset(asset.mipmap.x32);
                        isAssetsChanged = true;
                    }
                    resolve();
                }));
            });

            await Promise.all(promises);

            if (!!isAssetsChanged) {
                await riseRefVersion(getClientId(request), RefTypes.ASSETS);
            }
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Error in delete assets. ${err}`,
                    }
                ]
            }
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
            const ref = await riseRefVersion(getClientId(request), RefTypes.SELECTORS);
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