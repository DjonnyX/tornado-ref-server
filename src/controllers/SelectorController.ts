import { SelectorModel, ISelector, RefTypes, NodeModel, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Query, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes } from "../models/enums";
import { deleteNodesChain } from "../utils/node";
import { SelectorTypes } from "../models/enums/SelectorTypes";
import { formatSelectorModel } from "../utils/selector";
import { ISelectorContents } from "../models/Selector";
import { normalizeContents, getDeletedImagesFromDifferense, getEntityAssets } from "../utils/entity";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";

export interface ISelectorItem {
    id?: string;
    name?: string;
    type: SelectorTypes;
    active: boolean;
    contents: ISelectorContents;
    joint: string;
    extra?: { [key: string]: any } | null;
}

interface ISelectorsMeta {
    ref: IRefItem;
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
    name?: string;
    type: SelectorTypes;
    contents?: ISelectorContents;
    extra?: { [key: string]: any } | null;
}

interface ISelectorUpdateRequest {
    active?: boolean;
    name?: string;
    type?: SelectorTypes;
    contents?: ISelectorContents;
    extra?: { [key: string]: any } | null;
}

export const RESPONSE_TEMPLATE: ISelectorItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    type: SelectorTypes.MENU_CATEGORY,
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
        lastupdate: new Date(),
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
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest, @Query() type?: SelectorTypes): Promise<ISelectorsResponse> {
        try {
            const findParams: any = {
                client: request.client.id,
            };
            if (!!type) {
                findParams.type = type;
            }
            const items = await SelectorModel.find(findParams);
            const ref = await getRef(request.client.id, RefTypes.SELECTORS);
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
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<ISelectorResponse> {
        try {
            const item = await SelectorModel.findById(id);
            const ref = await getRef(request.client.id, RefTypes.SELECTORS);
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
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: ISelectorCreateRequest, @Request() request: IAuthRequest): Promise<ISelectorResponse> {
        let params: ISelectorItem;
        try {

            // создается корневой нод
            const jointNode = new NodeModel({
                client: request.client.id,
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
                client: request.client.id,
            } as any;
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
            const ref = await riseRefVersion(request.client.id, RefTypes.SELECTORS);
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
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: ISelectorUpdateRequest, @Request() request: IAuthRequest): Promise<ISelectorResponse> {
        let defaultLanguage: ILanguage;
        try {
            defaultLanguage = await LanguageModel.findOne({ client: request.client.id, isDefault: true });
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
            const promises = new Array<Promise<any>>();
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
                await riseRefVersion(request.client.id, RefTypes.ASSETS);
            }

            // выставление ассетов от предыдущего состояния
            // ассеты неьзя перезаписывать напрямую!
            if (!!lastContents) {
                for (const lang in lastContents) {
                    if (!item.contents[lang]) {
                        item.contents[lang] = {};
                    }
                    if (lastContents[lang]) {
                        item.contents[lang].assets = lastContents[lang].assets;
                    }
                }
            }

            await item.save();

            const ref = await riseRefVersion(request.client.id, RefTypes.SELECTORS);
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
    public async delete(id: string, @Request() request: IAuthRequest): Promise<ISelectorResponse> {
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

        // нужно удалять ассеты
        const assetsList = getEntityAssets(selector);

        const promises = new Array<Promise<any>>();

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
                await riseRefVersion(request.client.id, RefTypes.ASSETS);
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
            const ref = await riseRefVersion(request.client.id, RefTypes.SELECTORS);
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