import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import { RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Delete, Put, Body, Get } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IAsset, AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { assetsUploader, IFileInfo } from "../utils/assetUpload";
import { IRefItem } from "./RefsController";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAssetItem {
    id: string;
    name: string;
    ext: AssetExtensions;
    path: string;
    thumnail?: string;
    favicon?: string;
}

interface IAssetMeta {
    ref: IRefItem;
}

interface IGetAssetsResponse {
    meta?: IAssetMeta;
    data?: Array<IAssetItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ICreateAssetsResponse {
    meta?: IAssetMeta;
    data?: IAssetItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IUpdateAssetsResponse {
    meta?: IAssetMeta;
    data?: IAssetItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAssetUpdateRequest {
    name: string;
}

interface IDeleteAssetsResponse {
    meta?: IAssetMeta;
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

const META_TEMPLATE = {
    ref: {
        name: RefTypes.ASSETS,
        version: 1,
        lastUpdate: 1589885721,
    },
};

const RESPONSE_TEMPLATE = {
    id: "107c7f79bcf86cd7994f6c0e",
    name: "some_3d_model",
    ext: AssetExtensions.FBX,
    path: "assets/some_3d_model.fbx",
    thumbnail: "assets/some_3d_model_128x128.png",
    favicon: "assets/favicon.png",
};

export const uploadAsset = async (request: express.Request, allowedExtensions: Array<AssetExtensions>): Promise<ICreateAssetsResponse> => {
    let fileInfo: IFileInfo;
    try {
        fileInfo = await assetsUploader("file", allowedExtensions, request);
    } catch (err) {
        this.setStatus(500);
        return {
            error: [
                {
                    code: 500,
                    message: `Upload error. ${err}`,
                }
            ]
        };
    }

    let asset: IAsset;
    let assetRef: IRefItem;
    try {
        asset = new AssetModel(fileInfo);
        assetRef = await riseRefVersion(RefTypes.ASSETS);
        await asset.save();
    } catch (err) {
        this.setStatus(500);
        return {
            error: [
                {
                    code: 500,
                    message: `Create asset error. ${err}`,
                }
            ]
        };
    }

    return {
        meta: {
            ref: assetRef,
        },
        data: formatAssetModel(asset),
    };
};

/**
 * Возвращает удаленный asset
 */
export const deleteAsset = (assetPath: string): Promise<IAsset> => {
    return new Promise((resolve, reject) => {
        fs.unlink(path.normalize(assetPath), (err) => {
            if (!!err && err.code === "ENOENT") {
                return reject(Error("File doesn't exist, won't remove it."));
            } else
                if (!!err) {
                    return reject(err);
                }

            return resolve();
        });
    });
};

@Route("/assets")
@Tags("Assets")
export class AssetsController extends Controller {
    @Get()
    @Security("jwt")
    @OperationId("GetAll")
    @Example<IGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<IGetAssetsResponse> {
        try {
            const items = await AssetModel.find({});
            const ref = await getRef(RefTypes.ASSETS);
            return {
                meta: { ref },
                data: items.map(v => formatAssetModel(v))
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

@Route("/asset")
@Tags("Asset")
export class AssetController extends Controller {
    @Post()
    @Security("jwt")
    @OperationId("Create")
    @Example<ICreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Request() request: express.Request): Promise<ICreateAssetsResponse> {
        return await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);
    }

    @Put("{id}")
    @Security("jwt")
    @OperationId("Update")
    @Example<IUpdateAssetsResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: IAssetUpdateRequest): Promise<IUpdateAssetsResponse> {
        try {
            const item = await AssetModel.findById(id);
            if (request.name !== undefined) {
                item.name = request.name;
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.ASSETS);
            return {
                meta: { ref },
                data: formatAssetModel(item),
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
    @Example<IDeleteAssetsResponse>({
        meta: META_TEMPLATE,
        data: {}
    })
    public async delete(id: string): Promise<IDeleteAssetsResponse> {
        let ref: IRefItem;
        try {
            const asset = await AssetModel.findByIdAndDelete(id);
            await deleteAsset(asset.path);
            await deleteAsset(asset.thumbnail);
            await deleteAsset(asset.favicon);
            ref = await riseRefVersion(RefTypes.ASSETS);
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

        // тут проверку ресурсов у разных сущностей нужно сделать
        // и удаление соответствующих ассетов у сущностей

        return {
            meta: {
                ref,
            },
            data: {},
        };
    }
}
