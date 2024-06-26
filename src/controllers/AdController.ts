import { AdModel, IAdDocument, ILanguageDocument, LanguageModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Query, Request } from "tsoa";
import { AdTypes, IAd, IAdContents, IRef, RefTypes } from "@djonnyx/tornado-types";
import { getRef, riseRefVersion } from "../db/refs";
import { formatAdModel } from "../utils/ad";
import { normalizeContents, getDeletedImagesFromDifferense, getEntityAssets } from "../utils/entity";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { IAuthRequest } from "../interfaces";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";
import { LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";

export interface IAdItem extends IAd { }

interface IAdsMeta {
    ref: IRef;
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
    type: AdTypes | string;
    contents?: IAdContents;
    extra?: { [key: string]: any } | null;
}

interface IAdUpdateRequest {
    active?: boolean;
    type?: AdTypes;
    contents?: IAdContents | any;
    extra?: { [key: string]: any } | null;
}

export const AD_RESPONSE_TEMPLATE: IAdItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    type: AdTypes.BANNER,
    contents: {
        [LANGUAGE_RESPONSE_TEMPLATE?.code]: {
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
        lastUpdate: new Date(),
    }
};

export const updateAd = async (id: string, client: string, params: IAdUpdateRequest): Promise<IAdDocument> => {
    let defaultLanguage: ILanguageDocument;
    try {
        defaultLanguage = await LanguageModel.findOne({ client, isDefault: true });
    } catch (err) {
        throw Error(`Default language error. ${err}`);
    }

    const item = await AdModel.findById(id);

    let lastContents: IAdContents;
    for (const key in params) {
        if (key === "contents") {
            lastContents = item.contents;
            item[key] = params[key];
            normalizeContents(item.contents, defaultLanguage.code);
            item.markModified(key);
        } else if (key === "extra") {
            item.extra = { ...item.extra, ...params[key] };
            item.markModified(key);
        } else {
            item[key] = params[key];
        }
    }

    // удаление ассетов из разности resources
    const deletedAssetsFromImages = getDeletedImagesFromDifferense(lastContents, item.contents);
    const promises = new Array<Promise<void>>();
    let isAssetsChanged = false;
    deletedAssetsFromImages.forEach(assetId => {
        promises.push(new Promise<void>(async (resolve, reject) => {
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

    return item;
}

@Route("/ads")
@Tags("Ad")
export class AdsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<IAdsResponse>({
        meta: META_TEMPLATE,
        data: [AD_RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest, @Query() type?: AdTypes): Promise<IAdsResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(AdModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.ADS);
            return {
                meta: { ref },
                data: items.map((v: IAdDocument) => formatAdModel(v)),
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<IAdResponse>({
        meta: META_TEMPLATE,
        data: AD_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IAdResponse> {
        const client = getClientId(request);

        try {
            const item = await AdModel.findById(id);
            const ref = await getRef(client, RefTypes.ADS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<IAdResponse>({
        meta: META_TEMPLATE,
        data: AD_RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IAdCreateRequest, @Request() request: IAuthRequest): Promise<IAdResponse> {
        const client = getClientId(request);

        try {
            const item = new AdModel({ ...body, client });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.ADS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<IAdResponse>({
        meta: META_TEMPLATE,
        data: AD_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IAdUpdateRequest, @Request() request: IAuthRequest): Promise<IAdResponse> {
        const client = getClientId(request);

        if (body.active === false) {
            const item = await AdModel.findById(id);

            if (item.type !== AdTypes.BANNER) {
                const ads = await AdModel.find({ client, type: item.type });

                if (ads.length <= 1) {
                    body.active = true;
                }
            }
        }

        try {
            const item = await updateAd(id, client, body);

            const ref = await riseRefVersion(client, RefTypes.ADS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<IAdResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IAdResponse> {
        const client = getClientId(request);

        const item = await AdModel.findById(id);
        if (item.type !== AdTypes.BANNER) {
            const ads = await AdModel.find({ client, type: item.type });

            if (ads.length <= 1) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: "The last ad cannot be removed.",
                        }
                    ]
                };
            }
        }

        let ad: IAdDocument;
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

        const promises = new Array<Promise<void>>();

        try {
            let isAssetsChanged = false;
            assetsList.forEach(assetId => {
                promises.push(new Promise<void>(async (resolve) => {
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
            const ref = await riseRefVersion(client, RefTypes.ADS);
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