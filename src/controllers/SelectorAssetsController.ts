import * as express from "express";
import { RefTypes, ISelector, SelectorModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem } from "./AssetsController";
import { AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { ISelectorItem, SELECTOR_RESPONSE_TEMPLATE } from "./SelectorController";
import { formatSelectorModel } from "../utils/selector";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISelectorAsset extends IAssetItem { }

interface ISelectorGetAssetsResponse {
    meta?: {};
    data?: Array<ISelectorAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorCreateAssetsResponse {
    meta?: {
        selector: {
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
        };
    };
    data?: {
        asset: ISelectorAsset;
        selector: ISelectorItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorDeleteAssetsResponse {
    meta?: {
        selector: {
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
        };
    };
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISelectorUpdateAssetsRequest {
    name: string;
    active: boolean;
}

export enum SelectorImageTypes {
    MAIN = "main",
    THUMBNAIL = "thumbnail",
    ICON = "icon",
}

const META_TEMPLATE = {
    selector: {
        ref: {
            name: RefTypes.SELECTORS,
            version: 1,
            lastUpdate: 1589885721,
        },
    },
    asset: {
        ref: {
            name: RefTypes.ASSETS,
            version: 1,
            lastUpdate: 1589885721,
        },
    },
};

const RESPONSE_TEMPLATE: IAssetItem = {
    id: "107c7f79bcf86cd7994f6c0e",
    active: true,
    lastupdate: 1589885721,
    name: "some_3d_model",
    ext: AssetExtensions.FBX,
    mipmap: {
        x128: "assets/some_3d_model_128x128.png",
        x32: "assets/favicon.png",
    },
    path: "assets/some_3d_model.fbx",
};

@Route("/selector")
@Tags("Selector assets")
export class SelectorAssetsController extends Controller {
    @Get("{selectorId}/assets")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("Get")
    @Example<ISelectorGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(selectorId: string): Promise<ISelectorGetAssetsResponse> {
        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Selector with id: "${selectorId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assets = await AssetModel.find({ _id: selector.assets, });

            return {
                meta: {},
                data: assets.map(asset => formatAssetModel(asset)),
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

    @Post("{selectorId}/asset")
    @Security("jwt")
    @OperationId("Create")
    @Example<ISelectorCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            selector: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async create(selectorId: string, @Request() request: express.Request): Promise<ISelectorCreateAssetsResponse> {
        const assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);

        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
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

        let selectorRef: IRefItem;
        try {
            selector.assets.push(assetsInfo.data.id);
            selectorRef = await riseRefVersion(RefTypes.SELECTORS);
            await selector.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to selector assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                selector: {
                    ref: selectorRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                selector: formatSelectorModel(selector),
                asset: assetsInfo.data,
            }
        };
    }

    @Post("{selectorId}/image/{imageType}")
    @Security("jwt")
    @OperationId("Create")
    @Example<ISelectorCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            selector: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async image(selectorId: string, imageType: SelectorImageTypes, @Request() request: express.Request): Promise<ISelectorCreateAssetsResponse> {
        const assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);

        let selector: ISelector;
        let deletedAsset: string;
        try {
            selector = await SelectorModel.findById(selectorId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find selector error. ${err}`,
                    }
                ]
            };
        }

        deletedAsset = selector.images[imageType];
        
        const assetIndex = selector.assets.indexOf(deletedAsset);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(deletedAsset);
                await deleteAsset(asset.path);
                await deleteAsset(asset.mipmap.x128);
                await deleteAsset(asset.mipmap.x32);
            } catch (err) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: `Delete asset error. ${err}`,
                        }
                    ]
                };
            }
        }

        // удаление предыдущего ассета
        selector.assets = selector.assets.filter(asset => asset.toString() !== deletedAsset.toString());

        console.log(selector.assets, deletedAsset)

        let selectorRef: IRefItem;
        try {
            selector.images[imageType] = assetsInfo.data.id;
            selector.assets.push(assetsInfo.data.id);
            selectorRef = await riseRefVersion(RefTypes.SELECTORS);
            await selector.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to selector assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                selector: {
                    ref: selectorRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                selector: formatSelectorModel(selector),
                asset: assetsInfo.data,
            }
        };
    }
    
    @Put("{selectorId}/asset/{assetId}")
    @Security("jwt")
    @OperationId("Update")
    @Example<ISelectorCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            selector: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async update(selectorId: string, assetId: string, @Body() request: ISelectorUpdateAssetsRequest): Promise<ISelectorCreateAssetsResponse> {

        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
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
        
        let selectorRef: IRefItem;
        try {
            selectorRef = await getRef(RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get product ref error. ${err}`,
                    }
                ]
            };
        }
        
        try {
            const item = await AssetModel.findById(assetId);

            for (const key in request) {
                item[key] = request[key];
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.ASSETS);
            return {
                meta: { 
                    asset: {
                        ref,
                    },
                    selector: {
                        ref: selectorRef,
                    },
                 },
                data: {
                    asset: formatAssetModel(item),
                    selector: formatSelectorModel(selector),
                },
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

    @Delete("{selectorId}/asset/{assetId}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<ISelectorDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(selectorId: string, assetId: string): Promise<ISelectorDeleteAssetsResponse> {
        let selector: ISelector;
        try {
            selector = await SelectorModel.findById(selectorId);
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

        let assetRef: IRefItem;
        const assetIndex = selector.assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                await deleteAsset(asset.path);
                await deleteAsset(asset.mipmap.x128);
                await deleteAsset(asset.mipmap.x32);
                assetRef = await riseRefVersion(RefTypes.ASSETS);
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

        let selectorsRef: IRefItem;
        try {
            selector.assets.splice(assetIndex, 1);
            await selector.save();
            selectorsRef = await riseRefVersion(RefTypes.SELECTORS);
            return {
                meta: {
                    selector: {
                        ref: selectorsRef,
                    },
                    asset: {
                        ref: assetRef,
                    },
                }
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
