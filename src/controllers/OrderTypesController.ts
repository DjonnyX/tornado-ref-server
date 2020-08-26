import { RefTypes, OrderTypeModel, LanguageModel, ILanguage } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatOrderTypeModel } from "../utils/orderType";
import { IOrderTypeContents } from "../models/OrderTypes";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { normalizeContents, getDeletedImagesFromDifferense } from "../utils/entity";

export interface IOrderTypeItem {
    id: string;
    active: boolean;
    contents: IOrderTypeContents;
    extra?: { [key: string]: any } | null;
}

interface IOrderTypeMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface OrderTypesResponse {
    meta?: IOrderTypeMeta;
    data?: Array<IOrderTypeItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface OrderTypeResponse {
    meta?: IOrderTypeMeta;
    data?: IOrderTypeItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface OrderTypeCreateRequest {
    active: boolean;
    contents?: IOrderTypeContents;
    extra?: { [key: string]: any } | null;
}

const META_TEMPLATE: IOrderTypeMeta = {
    ref: {
        name: RefTypes.ORDER_TYPES,
        version: 1,
        lastUpdate: 1589885721,
    }
};

export const RESPONSE_TEMPLATE: IOrderTypeItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    contents: {
        "RU": {
            name: "Take away",
            description: "description",
            color: "#000000",
            assets: [
                "gt7h7f79bcf86cd7994f9d6u",
                "gt7h7f79bcf86cd7994f9d6u",
            ],
            images: {
                main: "gt7h7f79bcf86cd7994f9d6u",
                icon: "gt7h7f79bcf86cd7994f9d6u",
            },
        }
    },
    extra: { key: "value" },
};

@Route("/order-types")
@Tags("OrderType")
export class OrderTypesController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<OrderTypesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(): Promise<OrderTypesResponse> {
        try {
            const items = await OrderTypeModel.find({});
            const ref = await getRef(RefTypes.ORDER_TYPES);
            return {
                meta: { ref },
                data: items.map(v => formatOrderTypeModel(v)),
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

@Route("/order-type")
@Tags("OrderType")
export class OrderTypeController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string): Promise<OrderTypeResponse> {
        try {
            const item = await OrderTypeModel.findById(id);
            const ref = await getRef(RefTypes.ORDER_TYPES);
            return {
                meta: { ref },
                data: formatOrderTypeModel(item),
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
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: OrderTypeCreateRequest): Promise<OrderTypeResponse> {
        try {
            const item = new OrderTypeModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.ORDER_TYPES);
            return {
                meta: { ref },
                data: formatOrderTypeModel(savedItem),
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
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: OrderTypeCreateRequest): Promise<OrderTypeResponse> {
        let defaultLanguage: ILanguage;
        try {
            defaultLanguage = await LanguageModel.findOne({ isDefault: true });
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
            const item = await OrderTypeModel.findById(id);

            let lastContents: IOrderTypeContents;
            for (const key in request) {
                if (key === "contents") {
                    lastContents = item.contents;
                }

                item[key] = request[key];

                if (key === "extra" || key === "contents") {
                    if (key === "contents") {
                        normalizeContents(item.contents, defaultLanguage.code);
                    }
                    item.markModified(key);
                }
            }

            // удаление ассетов из разности images
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
                await riseRefVersion(RefTypes.ASSETS);
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

            const ref = await riseRefVersion(RefTypes.SELECTORS);
            return {
                meta: { ref },
                data: formatOrderTypeModel(item),
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
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string): Promise<OrderTypeResponse> {
        try {
            await OrderTypeModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.ORDER_TYPES);
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