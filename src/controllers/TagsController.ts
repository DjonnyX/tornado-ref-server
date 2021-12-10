import { TagModel, LanguageModel, ILanguageDocument, ProductModel, IProductDocument } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatTagModel } from "../utils/tag";
import { ITagDocument } from "../models/Tag";
import { AssetModel } from "../models/Asset";
import { ASSET_RESPONSE_TEMPLATE, deleteAsset } from "./AssetsController";
import { normalizeContents, getDeletedImagesFromDifferense, getEntityAssets } from "../utils/entity";
import { IAuthRequest } from "../interfaces";
import { IRef, ITag, ITagContents, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";
import { LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";

export interface ITagItem extends ITag { }

interface ITagMeta {
    ref: IRef;
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

export const TAG_RESPONSE_TEMPLATE: ITagItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    contents: {
        [LANGUAGE_RESPONSE_TEMPLATE?.code]: {
            name: "Cold",
            description: "description",
            color: "#000000",
            assets: [
                ASSET_RESPONSE_TEMPLATE?.id,
            ],
            resources: {
                main: ASSET_RESPONSE_TEMPLATE?.id,
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
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<TagsResponse>({
        meta: META_TEMPLATE,
        data: [TAG_RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<TagsResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(TagModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.TAGS);
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
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: TAG_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<TagResponse> {
        const client = getClientId(request);

        try {
            const item = await TagModel.findById(id);
            const ref = await getRef(client, RefTypes.TAGS);
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
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: TAG_RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: TagCreateRequest, @Request() request: IAuthRequest): Promise<TagResponse> {
        const client = getClientId(request);

        try {
            const item = new TagModel({ ...body, client });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.TAGS);
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
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<TagResponse>({
        meta: META_TEMPLATE,
        data: TAG_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: TagCreateRequest, @Request() request: IAuthRequest): Promise<TagResponse> {
        const client = getClientId(request);

        let defaultLanguage: ILanguageDocument;
        try {
            defaultLanguage = await LanguageModel.findOne({ client, isDefault: true });
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
                    item[key] = body[key];
                    normalizeContents(item.contents, defaultLanguage.code);
                    item.markModified(key);
                } else if (key === "extra") {
                    item[key] = body[key];
                    item.extra = { ...item.extra, ...body[key] };
                    item.markModified(key);
                } else {
                    item[key] = body[key];
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
                await riseRefVersion(client, RefTypes.ASSETS);
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

            const ref = await riseRefVersion(client, RefTypes.SELECTORS);
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
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<TagResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<TagResponse> {
        const client = getClientId(request);

        let products: Array<IProductDocument>;
        try {
            products = await ProductModel.find({ client, tags: [id] });
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
            await riseRefVersion(client, RefTypes.PRODUCTS);
        } catch (err) {
            console.warn(`Save products error. ${err}`);
        }


        let tag: ITagDocument;
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
                await riseRefVersion(client, RefTypes.ASSETS);
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
            const ref = await riseRefVersion(client, RefTypes.TAGS);
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