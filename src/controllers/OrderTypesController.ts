import { OrderTypeModel, LanguageModel, ILanguageDocument } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatOrderTypeModel } from "../utils/orderType";
import { IOrderTypeDocument } from "../models/OrderTypes";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { normalizeContents, getDeletedImagesFromDifferense, getEntityAssets } from "../utils/entity";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "src/interfaces";
import { IOrderType, IOrderTypeContents, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";

export interface IOrderTypeItem extends IOrderType { }

interface IOrderTypeMeta {
    ref: IRefItem;
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
    isDefault?: boolean;
    contents?: IOrderTypeContents | any;
    extra?: { [key: string]: any } | null;
}

const META_TEMPLATE: IOrderTypeMeta = {
    ref: {
        name: RefTypes.ORDER_TYPES,
        version: 1,
        lastUpdate: new Date(),
    }
};

export const RESPONSE_TEMPLATE: IOrderTypeItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    isDefault: true,
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
            resources: {
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<OrderTypesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<OrderTypesResponse> {
        try {
            const items = await findAllWithFilter(OrderTypeModel.find({ client: request.account.id }), request);
            const ref = await getRef(request.account.id, RefTypes.ORDER_TYPES);
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<OrderTypeResponse> {
        try {
            const item = await OrderTypeModel.findById(id);
            const ref = await getRef(request.account.id, RefTypes.ORDER_TYPES);
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
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: OrderTypeCreateRequest, @Request() request: IAuthRequest): Promise<OrderTypeResponse> {
        let orderTypes: Array<IOrderTypeDocument>;

        try {
            orderTypes = await OrderTypeModel.find({ client: request.account.id });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get OrderTypes error. ${err}`,
                    }
                ]
            };
        }

        try {
            body.isDefault = orderTypes.length === 0;
            const item = new OrderTypeModel({ ...body, client: request.account.id });
            const savedItem = await item.save();
            const ref = await riseRefVersion(request.account.id, RefTypes.ORDER_TYPES);
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
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: OrderTypeCreateRequest, @Request() request: IAuthRequest): Promise<OrderTypeResponse> {
        let defaultLanguage: ILanguageDocument;
        try {
            defaultLanguage = await LanguageModel.findOne({ client: request.account.id, isDefault: true });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get default language error. ${err}`,
                    }
                ]
            };
        }

        let isDefault: boolean;

        let item: IOrderTypeDocument;

        try {
            item = await OrderTypeModel.findById(id);

            let lastContents: IOrderTypeContents;
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

            isDefault = item.isDefault;

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
                await riseRefVersion(request.account.id, RefTypes.ASSETS);
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
            const orderTypes: Array<IOrderTypeDocument> = await OrderTypeModel.find({ client: request.account.id });

            const promises = new Array<Promise<void>>();

            if (isDefault) {
                orderTypes.forEach(orderType => {
                    if (orderType.id !== item.id) {
                        if (!!orderType.isDefault) {
                            orderType.isDefault = false;
                            promises.push(new Promise<void>(async (resolve, reject) => {
                                try {
                                    await orderType.save();
                                } catch (err) {
                                    reject(err);
                                }
                                resolve();
                            }));
                        }
                    }
                });
            } else {
                let needSetupDefault = true;
                let firstOrderType: IOrderTypeDocument;

                orderTypes.forEach(orderType => {
                    if (!firstOrderType) {
                        firstOrderType = orderType;
                    }

                    if (orderType.isDefault) {
                        needSetupDefault = false;
                    }
                });

                if (needSetupDefault && firstOrderType) {
                    firstOrderType.isDefault = true;

                    promises.push(new Promise<void>(async (resolve, reject) => {
                        try {
                            await firstOrderType.save();
                        } catch (err) {
                            reject(err);
                        }
                        resolve();
                    }));
                }
            }

            await Promise.all(promises);

        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Set default OrderType error. ${err}`,
                    }
                ]
            };
        }

        try {
            await item.save();

            const ref = await riseRefVersion(request.account.id, RefTypes.ORDER_TYPES);
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
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<OrderTypeResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<OrderTypeResponse> {
        let orderTypes: Array<IOrderTypeDocument>;
        try {
            orderTypes = await OrderTypeModel.find({ client: request.account.id });
        } catch (err) { }

        if (orderTypes && orderTypes.length === 1) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "There must be at least one OrderType left.",
                    }
                ]
            };
        }

        let orderType: IOrderTypeDocument;
        try {
            orderType = await OrderTypeModel.findByIdAndDelete(id);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find and delete orderType error. ${err}`,
                    }
                ]
            };
        }

        // нужно удалять ассеты
        const assetsList = getEntityAssets(orderType);

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
                await riseRefVersion(request.account.id, RefTypes.ASSETS);
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
            const ref = await riseRefVersion(request.account.id, RefTypes.ORDER_TYPES);
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