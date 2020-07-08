import * as joi from "@hapi/joi";
import * as express from "express";
import { ProductModel, IProduct, RefTypes } from "../models/index";
import { Controller, Route, Get, Post, Tags, OperationId, Example, Request, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { NodeTypes, AssetExtensions } from "../models/enums";
import { deleteNodesChain } from "../utils/node";
import { IAsset, AssetModel } from "../models/Asset";
import { formatAsset } from "../utils/asset";
import { IProductsMeta } from "./ProductsController";
import { assetsUploader, IFileInfo } from "../assetUpload";

interface IProductAsset {
    // id: string;
    name: string;
    ext: AssetExtensions;
    path: string;
}

interface IProductImagesResponse {
    meta?: IProductsMeta;
    data?: IProductAsset;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

const META_TEMPLATE: IProductsMeta = {
    ref: {
        name: RefTypes.PRODUCTS,
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/product/images")
@Tags("Product images")
export class ProductImagesController extends Controller {
    @Post()
    @Security("jwt")
    @OperationId("Create")
    @Example<IProductImagesResponse>({
        meta: META_TEMPLATE,
        data: {
            // id: "107c7f79bcf86cd7994f6c0e",
            name: "some_3d_model",
            ext: AssetExtensions.FBX,
            path: "assets/some_model.fbx"
        }
    })
    public async create(@Request() request: express.Request): Promise<IProductImagesResponse> {

        let fileInfo: IFileInfo;
        try {
            fileInfo = await assetsUploader("file", [AssetExtensions.JPG, AssetExtensions.PNG], request);
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

        /*const validation = validateCreateAsset(request);
        if (validation.error) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: validation.error.message,
                    }
                ]
            };
        }*/

        /*try {
            const item = await ProductModel.findById(formData.get("id"));
            const ref = await getRef(RefTypes.PRODUCTS);
            return {
                meta: { ref },
                data: formatModel(item)
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
        }*/

        /*let asset: IAsset;
        try {
            asset = new AssetModel({
                path: "some path",
                name: formData.get.file.name,
                ext: request.file.type,
            });
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

        return {
            data: formatAsset(asset),
        };*/

        return {
            data: fileInfo,
        };
    }
}
