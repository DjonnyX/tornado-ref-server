import * as fs from "fs";
import * as path from "path";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Delete, Put, Body, Get } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { IAssetDocument, AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { assetsUploader, IFileInfo } from "../utils/assetUpload";
import { IAuthRequest } from "../interfaces";
import { AssetExtensions, IRef, RefTypes, IAsset } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAssetItem extends IAsset { }

interface IAssetMeta {
    ref: IRef;
}

interface IGetAssetsResponse {
    meta?: IAssetMeta;
    data?: Array<IAssetItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

export interface ICreateAssetsResponse {
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
        lastUpdate: new Date(),
    },
};

const RESPONSE_TEMPLATE: IAssetItem = {
    id: "107c7f79bcf86cd7994f6c0e",
    active: true,
    lastUpdate: new Date(),
    name: "some_image",
    ext: AssetExtensions.WEBP,
    path: "assets/some_image.webp",
    mipmap: {
        x128: "assets/some_image_128x128.webp",
        x32: "assets/favicon.webp",
    },
    extra: {},
};

export const uploadAsset = async (request: IAuthRequest, allowedExtensions: Array<AssetExtensions>, active = true, extra?: any): Promise<ICreateAssetsResponse> => {
    const client = getClientId(request);

    let fileInfo: IFileInfo;
    try {
        fileInfo = await assetsUploader("file", allowedExtensions, request, extra);
    } catch (err) {
        return {
            error: [
                {
                    code: 500,
                    message: `Upload error. ${err}`,
                }
            ]
        };
    }

    let asset: IAssetDocument;
    let assetRef: IRef;
    try {
        asset = new AssetModel({ ...fileInfo, active, client });
        assetRef = await riseRefVersion(client, RefTypes.ASSETS);
        await asset.save();
    } catch (err) {
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
export const deleteAsset = (assetPath: string): Promise<IAssetDocument | void> => {
    return new Promise((resolve, reject) => {
        fs.unlink(path.normalize(assetPath), (err) => {
            /*if (!!err && err.code === "ENOENT") {
                return reject(Error("File doesn't exist, won't remove it."));
            } else
                if (!!err) {
                    return reject(err);
                }
            */

            return resolve();
        });
    });
};

@Route("/assets")
@Tags("Asset")
export class AssetsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<IGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<IGetAssetsResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(AssetModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.ASSETS);
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

/*@Route("/asset")
@Tags("Asset")
export class AssetController extends Controller {
    @Post()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<ICreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Request() request: express.Request): Promise<ICreateAssetsResponse> {
        return await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<IUpdateAssetsResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: IAssetUpdateRequest): Promise<IUpdateAssetsResponse> {
        try {
            const item = await AssetModel.findById(id);
            item.lastUpdate = new Date(Date.now());
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<IDeleteAssetsResponse>({
        meta: META_TEMPLATE,
        data: {}
    })
    public async delete(id: string): Promise<IDeleteAssetsResponse> {
        let ref: IRef;
        try {
            const asset = await AssetModel.findByIdAndDelete(id);
            await deleteAsset(asset.path);
            await deleteAsset(asset.mipmap.x128);
            await deleteAsset(asset.mipmap.x32);
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
*/