import { AssetExtensions, IRef, RefTypes, KioskThemeResourceTypes } from "@djonnyx/tornado-types";
import { AppThemeModel, IAppThemeDocument } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { IAppThemeItem, RESPONSE_TEMPLATE as APP_THEME_RESPONSE_TEMPLATE } from "./AppThemeController";
import { formatAppThemeModel } from "../utils/appTheme";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse } from "./AssetsController";
import { AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { IAuthRequest } from "../interfaces";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAppThemeAsset extends IAssetItem { }

interface IAppThemeGetAllAssetsResponse {
    meta?: {};
    data?: Array<IAppThemeAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAppThemeGetAssetsResponse {
    meta?: {};
    data?: Array<IAppThemeAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAppThemeCreateAssetsResponse {
    meta?: {
        theme: {
            ref: IRef;
        };
        asset: {
            ref: IRef;
        };
    };
    data?: {
        asset: IAppThemeAsset;
        theme: IAppThemeItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAppThemeDeleteAssetsResponse {
    meta?: {
        theme: {
            ref: IRef;
        };
        asset: {
            ref: IRef;
        };
    };
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAppThemeAssetUpdateRequest {
    active: boolean;
    name: string;
}

const META_TEMPLATE = {
    theme: {
        ref: {
            name: RefTypes.THEMES,
            version: 1,
            lastUpdate: new Date(),
        },
    },
    asset: {
        ref: {
            name: RefTypes.ASSETS,
            version: 1,
            lastUpdate: new Date(),
        },
    },
};

const RESPONSE_TEMPLATE: IAssetItem = {
    id: "107c7f79bcf86cd7994f6c0e",
    active: true,
    lastUpdate: new Date(),
    name: "some_asset",
    ext: AssetExtensions.PNG,
    mipmap: {
        x128: "assets/some_asset_128x128.png",
        x32: "assets/favicon.png",
    },
    path: "assets/some_asset.png",
};

@Route("/app-theme")
@Tags("AppTheme assets")
export class AppThemeAssetsController extends Controller {
    @Get("{appThemeId}/assets")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<IAppThemeGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAllAssets(appThemeId: string): Promise<IAppThemeGetAllAssetsResponse> {
        let appTheme: IAppThemeDocument;
        try {
            appTheme = await AppThemeModel.findById(appThemeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `AppTheme with id: "${appThemeId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assetsInfo = await AssetModel.find({ _id: appTheme.assets });

            return {
                meta: {},
                data: assetsInfo.map(asset => formatAssetModel(asset)),
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

    @Post("{appThemeId}/resource/{resourceType}")
    @Security("clientAccessToken")
    @OperationId("CreateResource")
    @Example<IAppThemeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            theme: APP_THEME_RESPONSE_TEMPLATE,
        }
    })
    public async resource(appThemeId: string, resourceType: KioskThemeResourceTypes | string,
        @Request() request: IAuthRequest): Promise<IAppThemeCreateAssetsResponse> {
        let assetsInfo: ICreateAssetsResponse;
        try {
            assetsInfo = await uploadAsset(request, [
                AssetExtensions.JPG,
                AssetExtensions.PNG,
                AssetExtensions.GIF,
                AssetExtensions.WEBP,
            ], false);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Upload asset error. ${err}`,
                    }
                ]
            };
        }

        let appTheme: IAppThemeDocument;
        let deletedAsset: string;
        try {
            appTheme = await AppThemeModel.findById(appThemeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find appTheme error. ${err}`,
                    }
                ]
            };
        }

        deletedAsset = appTheme.resources[resourceType];

        let isAssetExistsInOtherProps = 0;
        // детект количества повторяющихся изображений
        for (const img in appTheme.resources) {
            if (!!appTheme.resources[img] && appTheme.resources[img] === deletedAsset) {
                isAssetExistsInOtherProps++;
            }
        }

        // Удаление ассета только если он не используется в разных свойствах
        if (isAssetExistsInOtherProps !== 1) {
            deletedAsset = undefined;
        }

        const assetIndex = !!deletedAsset ? appTheme.assets.indexOf(deletedAsset) : -1;
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(deletedAsset);
                if (!!asset) {
                    await deleteAsset(asset.path);
                    await deleteAsset(asset.mipmap.x128);
                    await deleteAsset(asset.mipmap.x32);
                    await riseRefVersion(request.account.id, RefTypes.ASSETS);
                }
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
        if (!!deletedAsset) {
            appTheme.assets = appTheme.assets.filter(asset => {
                return asset.toString() !== deletedAsset.toString();
            });
        }

        let appThemeRef: IRef;
        let savedAppTheme: IAppThemeDocument;
        try {
            const assetId = assetsInfo.data.id.toString();
            appTheme.resources[resourceType] = assetId;
            appTheme.assets.push(assetId);

            savedAppTheme = await appTheme.save();

            appThemeRef = await riseRefVersion(request.account.id, RefTypes.THEMES, {
                "extra.type.equals": appTheme.type,
            });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to appTheme assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                theme: {
                    ref: appThemeRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                theme: formatAppThemeModel(savedAppTheme),
                asset: assetsInfo.data,
            }
        };
    }

    @Put("{appThemeId}/asset/{assetId}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<IAppThemeCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            theme: APP_THEME_RESPONSE_TEMPLATE,
        }
    })
    public async update(appThemeId: string, assetId: string, @Body() body: IAppThemeAssetUpdateRequest,
        @Request() request: IAuthRequest): Promise<IAppThemeCreateAssetsResponse> {

        let appTheme: IAppThemeDocument;
        try {
            appTheme = await AppThemeModel.findById(appThemeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not found appTheme error. ${err}`,
                    }
                ]
            };
        }

        let appThemeRef: IRef;
        try {
            appThemeRef = await getRef(request.account.id, RefTypes.THEMES, {
                "extra.type.equals": appTheme.type,
            });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get appTheme ref error. ${err}`,
                    }
                ]
            };
        }

        try {
            const item = await AssetModel.findById(assetId);

            for (const key in body) {
                item[key] = body[key];
            }

            await item.save();

            const ref = await riseRefVersion(request.account.id, RefTypes.ASSETS);
            return {
                meta: {
                    asset: {
                        ref,
                    },
                    theme: {
                        ref: appThemeRef,
                    },
                },
                data: {
                    asset: formatAssetModel(item),
                    theme: formatAppThemeModel(appTheme),
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

    @Delete("{appThemeId}/asset/{assetId}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<IAppThemeDeleteAssetsResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(appThemeId: string, assetId: string, @Request() request: IAuthRequest): Promise<IAppThemeDeleteAssetsResponse> {
        let appTheme: IAppThemeDocument;
        try {
            appTheme = await AppThemeModel.findById(appThemeId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find appTheme error. ${err}`,
                    }
                ]
            };
        }

        let assetRef: IRef;
        const assetIndex = appTheme.assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                if (!!asset) {
                    await deleteAsset(asset.path);
                    await deleteAsset(asset.mipmap.x128);
                    await deleteAsset(asset.mipmap.x32);
                    assetRef = await riseRefVersion(request.account.id, RefTypes.ASSETS);
                }
            } catch (err) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: `Delete assets error. ${err}`,
                        }
                    ]
                };
            }
        }

        let appThemesRef: IRef;
        try {
            appTheme.assets.splice(assetIndex, 1);
            delete appTheme.resources[assetId];

            appTheme.markModified("resources");

            await appTheme.save();

            appThemesRef = await riseRefVersion(request.account.id, RefTypes.THEMES, {
                "extra.type.equals": appTheme.type,
            });
            return {
                meta: {
                    theme: {
                        ref: appThemesRef,
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
                        message: `Save appTheme error. ${err}`,
                    }
                ]
            };
        }
    }
}
