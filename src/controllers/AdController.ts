import { AdModel, IAd, RefTypes, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Query, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { AdTypes } from "../models/enums/AdTypes";
import { formatAdModel } from "../utils/ad";
import { IAdContents } from "../models/Ad";
import { normalizeContents, getDeletedImagesFromDifferense, getEntityAssets } from "../utils/entity";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";
import { request } from "express";

export interface IAdItem {
    id?: string;
    name?: string;
    type: AdTypes;
    active: boolean;
    contents: IAdContents;
    extra?: { [key: string]: any } | null;
}

interface IAdsMeta {
    ref: IRefItem;
}

interface IAdsResponse {
    meta?: IAdsMeta;
    data?: Array<IAdItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAdResponse {
    meta?: IAdsMeta;
    data?: IAdItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAdCreateRequest {
    active: boolean;
    name?: string;
    type: AdTypes;
    contents?: IAdContents;
    extra?: { [key: string]: any } | null;
}

interface IAdUpdateRequest {
    active?: boolean;
    name?: string;
    type?: AdTypes;
    contents?: IAdContents;
    extra?: { [key: string]: any } | null;
}

export const RESPONSE_TEMPLATE: IAdItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    type: AdTypes.BANNER,
    contents: {
        "RU": {
            name: "Ads on concert",
            duration: 10,
            color: "#000000",
            resources: {
                main: "g8h07f79bcf86cd7994f9d7k",
            },
            assets: ["g8h07f79bcf86cd7994f9d7k"],
        }
    },
    extra: { key: "value" }
};

const META_TEMPLATE: IAdsMeta = {
    ref: {
        name: RefTypes.ADS,
        version: 1,
        lastupdate: new Date(),
    }
};

@Route("/ads")
@Tags("Ad")
export class AdsController extends Controller {
    @Get()
    @Security("clientToken")
    @Security("serverToken")
    @OperationId("GetAll")
    @Example<IAdsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest, @Query() type?: AdTypes): Promise<IAdsResponse> {
        try {
            const findParams: any = {
                client: request.client.id,
            };

            if (!!type) {
                findParams.type = type;
            }
            const items = await AdModel.find(findParams);
            const ref = await getRef(request.client.id, RefTypes.ADS);
            return {
                meta: { ref },
                data: items.map(v => formatAdModel(v)),
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

@Route("/ad")
@Tags("Ad")
export class AdController extends Controller {
    @Get("{id}")
    @Security("clientToken")
    @Security("serverToken")
    @OperationId("GetOne")
    @Example<IAdResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IAdResponse> {
        try {
            const item = await AdModel.findById(id);
            const ref = await getRef(request.client.id, RefTypes.ADS);
            return {
                meta: { ref },
                data: formatAdModel(item),
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
    @Security("clientToken")
    @OperationId("Create")
    @Example<IAdResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IAdCreateRequest, @Request() request: IAuthRequest): Promise<IAdResponse> {
        try {
            const item = new AdModel({ ...body, client: request.client.id });
            const savedItem = await item.save();
            const ref = await riseRefVersion(request.client.id, RefTypes.ADS);
            return {
                meta: { ref },
                data: formatAdModel(savedItem),
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
    @Security("clientToken")
    @OperationId("Update")
    @Example<IAdResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IAdUpdateRequest, @Request() request: IAuthRequest): Promise<IAdResponse> {
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
            const item = await AdModel.findById(id);

            let lastContents: IAdContents;
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

            const ref = await riseRefVersion(request.client.id, RefTypes.ADS);
            return {
                meta: { ref },
                data: formatAdModel(item),
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
    @Security("clientToken")
    @OperationId("Delete")
    @Example<IAdResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IAdResponse> {
        let ad: IAd;
        try {
            ad = await AdModel.findByIdAndDelete(id);
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
        const assetsList = getEntityAssets(ad);

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
            const ref = await riseRefVersion(request.client.id, RefTypes.ADS);
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