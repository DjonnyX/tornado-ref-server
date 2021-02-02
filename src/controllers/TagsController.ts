import { TagModel, LanguageModel, ILanguage, ProductModel, IProduct } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatTagModel } from "../utils/tag";
import { ITag } from "../models/Tag";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { normalizeContents, getDeletedImagesFromDifferense, getEntityAssets } from "../utils/entity";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";
import { ITagContents, RefTypes } from "@djonnyx/tornado-types";

export interface ITagItem {
    id: string;
    active: boolean;
    name?: string;
    contents: ITagContents;
    extra?: { [key: string]: any } | null;
}

interface ITagMeta {
    ref: IRefItem;
}

interface TagsResponse {
    meta?: ITagMeta;
    data?: Array<ITagItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface TagResponse {
    meta?: ITagMeta;
    data?: ITagItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface TagCreateRequest {
    active: boolean;
    name?: string;
    contents?: ITagContents | any;
    extra?: { [key: string]: any } | null;
}

const META_TEMPLATE: ITagMeta = {
    ref: {
        name: RefTypes.TAGS,
        version: 1,
        lastUpdate: new Date(),
    }
};

export const RESPONSE_TEMPLATE: ITagItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    contents: {
        "RU": {
            name: "Cold",
            description: "description",
            color: "#000000",
            assets: [
                "gt7h7f79bcf86cd7994f9d6u",
            ],
            resources: {
                main: "gt7h7f79bcf86cd7994f9d6u",
                icon: "gt7h7f79bcf86cd7994f9d6u",
            },
        }
    },
    extra: { key: "value" },
};

@Route("/tags")
@Tags("Tag")
export class TagsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<TagsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<TagsResponse> {
        try {
            const items = await TagModel.find({ client: request.client.id });
            const ref = await getRef(request.client.id, RefTypes.TAGS);
            return {
                meta: { ref },
                data: items.map(v => formatTagModel(v)),
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<TagResponse> {
        try {
            const item = await TagModel.findById(id);
            const ref = await getRef(request.client.id, RefTypes.TAGS);
            return {
                meta: { ref },
                data: formatTagModel(item),
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
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: TagCreateRequest, @Request() request: IAuthRequest): Promise<TagResponse> {
        try {
            const item = new TagModel({...body, client: request.client.id});
            const savedItem = await item.save();
            const ref = await riseRefVersion(request.client.id, RefTypes.TAGS);
            return {
                meta: { ref },
                data: formatTagModel(savedItem),
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
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: TagCreateRequest, @Request() request: IAuthRequest): Promise<TagResponse> {
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
            const item = await TagModel.findById(id);

            let lastContents: ITagContents;
            for (const key in body) {
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
                await riseRefVersion(request.client.id, RefTypes.ASSETS);
            }

            // выставление ассетов от предыдущего состояния
            // ассеты нельзя перезаписывать напрямую!
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
                data: formatTagModel(item),
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
    @Example<TagResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<TagResponse> {
        let products: Array<IProduct>;
        try {
            products = await ProductModel.find({ client: request.client.id, tags: [id] });
        } catch (err) {
            console.warn(`Products with contains tag ${id} found error. ${err}`);
        }

        const promises = new Array<Promise<void>>();
        if (!!products) {
            products.forEach(product => {
                if (!!product.tags) {
                    const index = product.tags.indexOf(id);
                    if (index > -1) {
                        product.tags.splice(index, 1);
                        promises.push(new Promise(async (resolve, reject) => {
                            try {
                                await product.save();
                            } catch (err) {
                                reject();
                                return;
                            }
                            resolve();
                        }));
                    }
                }
            });
        }

        try {
            await Promise.all(promises);
            await riseRefVersion(request.client.id, RefTypes.PRODUCTS);
        } catch (err) {
            console.warn(`Save products error. ${err}`);
        }


        let tag: ITag;
        try {
            tag = await TagModel.findByIdAndDelete(id);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find and delete tag error. ${err}`,
                    }
                ]
            };
        }

        // нужно удалять ассеты
        const assetsList = getEntityAssets(tag);

        const assetsPromises = new Array<Promise<void>>();

        try {
            let isAssetsChanged = false;
            assetsList.forEach(assetId => {
                assetsPromises.push(new Promise(async (resolve) => {
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

            await Promise.all(assetsPromises);

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
            const ref = await riseRefVersion(request.client.id, RefTypes.TAGS);
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