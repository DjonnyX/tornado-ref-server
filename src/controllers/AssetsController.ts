import * as express from "express";
import { RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security } from "tsoa";
import { riseRefVersion } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IAsset, AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { assetsUploader, IFileInfo } from "../utils/assetUpload";
import { IRefItem } from "./RefsController";

interface IAssetItem {
    id: string;
    name: string;
    ext: AssetExtensions;
    path: string;
}

interface IAssetMeta {
    ref: IRefItem;
}

interface IProductImagesResponse {
    meta?: IAssetMeta;
    data?: IAssetItem;
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

export const uploadAsset = async (request: express.Request, allowedExtensions: Array<AssetExtensions>): Promise<IProductImagesResponse> => {
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

@Route("/assets")
@Tags("Asset")
export class AssetController extends Controller {
    @Post()
    @Security("jwt")
    @OperationId("Create")
    @Example<IProductImagesResponse>({
        meta: META_TEMPLATE,
        data: {
            id: "107c7f79bcf86cd7994f6c0e",
            name: "some_3d_model",
            ext: AssetExtensions.FBX,
            path: "assets/some_model.fbx",
        }
    })
    public async create(@Request() request: express.Request): Promise<IProductImagesResponse> {
        return await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);
    }
}
