import { ILanguageDocument, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { uploadAsset, deleteAsset, IAssetItem } from "./AssetsController";
import { AssetModel } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { ILanguageItem, LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";
import { formatLanguageModel } from "../utils/language";
import { IAuthRequest } from "../interfaces";
import { AssetExtensions, IRef } from "@djonnyx/tornado-types";
import { RefTypes } from "@djonnyx/tornado-types";
import { getClientId } from "../utils/account";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ILanguageAsset extends IAssetItem { }

interface ILanguageGetAssetsResponse {
    meta?: {};
    data?: Array<ILanguageAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ILanguageCreateAssetsResponse {
    meta?: {
        language: {
            ref: IRef;
        };
        asset: {
            ref: IRef;
        };
    };
    data?: {
        asset: ILanguageAsset;
        language: ILanguageItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ILanguageDeleteAssetsResponse {
    meta?: {
        language: {
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

interface ILanguageUpdateAssetsRequest {
    name: string;
    active: boolean;
}

export enum LanguageImageTypes {
    MAIN = "main",
}

const META_TEMPLATE = {
    language: {
        ref: {
            name: RefTypes.LANGUAGES,
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
    name: "some_image",
    ext: AssetExtensions.WEBP,
    mipmap: {
        x128: "assets/some_image_128x128.webp",
        x32: "assets/favicon.webp",
    },
    path: "assets/some_image.webp",
    extra: {},
};

@Route("/language")
@Tags("Language assets")
export class LanguageAssetsController extends Controller {
    @Get("{languageId}/assets")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("Get")
    @Example<ILanguageGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(languageId: string): Promise<ILanguageGetAssetsResponse> {
        let language: ILanguageDocument;
        try {
            language = await LanguageModel.findById(languageId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Language with id: "${languageId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assets = await AssetModel.find({ _id: language.assets, });

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

    @Post("{languageId}/asset")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<ILanguageCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            language: LANGUAGE_RESPONSE_TEMPLATE,
        }
    })
    public async create(languageId: string, @Request() request: IAuthRequest): Promise<ILanguageCreateAssetsResponse> {
        const client = getClientId(request);
        
        const assetsInfo = await uploadAsset(request, [
            AssetExtensions.JPG,
            AssetExtensions.PNG,
            AssetExtensions.GIF,
            AssetExtensions.WEBP
        ]);

        let language: ILanguageDocument;
        try {
            language = await LanguageModel.findById(languageId);
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

        let languageRef: IRef;
        try {
            language.assets.push(assetsInfo.data.id);
            languageRef = await riseRefVersion(client, RefTypes.LANGUAGES);
            await language.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to language assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                language: {
                    ref: languageRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                language: formatLanguageModel(language),
                asset: assetsInfo.data,
            }
        };
    }

    @Post("{languageId}/resource/{resourceType}")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<ILanguageCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            language: LANGUAGE_RESPONSE_TEMPLATE,
        }
    })
    public async resource(languageId: string, resourceType: LanguageImageTypes, @Request() request: IAuthRequest): Promise<ILanguageCreateAssetsResponse> {
        const client = getClientId(request);
        
        const assetsInfo = await uploadAsset(request, [
            AssetExtensions.JPG,
            AssetExtensions.PNG,
            AssetExtensions.GIF,
            AssetExtensions.WEBP,
        ], false);

        let language: ILanguageDocument;
        let deletedAsset: string;
        try {
            language = await LanguageModel.findById(languageId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find language error. ${err}`,
                    }
                ]
            };
        }

        deletedAsset = language.resources[resourceType];

        const assetIndex = language.assets.indexOf(deletedAsset);
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
        language.assets = language.assets.filter(asset => asset.toString() !== deletedAsset.toString());

        let languageRef: IRef;
        try {
            language.resources[resourceType] = assetsInfo.data.id;
            language.assets.push(assetsInfo.data.id);
            languageRef = await riseRefVersion(client, RefTypes.LANGUAGES);
            await language.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to language assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                language: {
                    ref: languageRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                language: formatLanguageModel(language),
                asset: assetsInfo.data,
            }
        };
    }

    @Put("{languageId}/asset/{assetId}")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<ILanguageCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            language: LANGUAGE_RESPONSE_TEMPLATE,
        }
    })
    public async update(languageId: string, assetId: string, @Body() body: ILanguageUpdateAssetsRequest, @Request() request: IAuthRequest): Promise<ILanguageCreateAssetsResponse> {
        const client = getClientId(request);

        let language: ILanguageDocument;
        try {
            language = await LanguageModel.findById(languageId);
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

        let languageRef: IRef;
        try {
            languageRef = await getRef(client, RefTypes.LANGUAGES);
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

            for (const key in body) {
                item[key] = body[key];
            }

            await item.save();

            const ref = await riseRefVersion(client, RefTypes.ASSETS);
            return {
                meta: {
                    asset: {
                        ref,
                    },
                    language: {
                        ref: languageRef,
                    },
                },
                data: {
                    asset: formatAssetModel(item),
                    language: formatLanguageModel(language),
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

    @Delete("{languageId}/asset/{assetId}")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<ILanguageDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(languageId: string, assetId: string, @Request() request: IAuthRequest): Promise<ILanguageDeleteAssetsResponse> {
        const client = getClientId(request);

        let language: ILanguageDocument;
        try {
            language = await LanguageModel.findById(languageId);
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

        let assetRef: IRef;
        const assetIndex = language.assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                await deleteAsset(asset.path);
                await deleteAsset(asset.mipmap.x128);
                await deleteAsset(asset.mipmap.x32);
                assetRef = await riseRefVersion(client, RefTypes.ASSETS);
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

        let languagesRef: IRef;
        try {
            language.assets.splice(assetIndex, 1);
            await language.save();
            languagesRef = await riseRefVersion(client, RefTypes.LANGUAGES);
            return {
                meta: {
                    language: {
                        ref: languagesRef,
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
