import { TagModel, ITagDocument, ILanguageDocument, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { ITagItem, RESPONSE_TEMPLATE as SELECTOR_RESPONSE_TEMPLATE } from "./TagsController";
import { formatTagModel } from "../utils/tag";
import { normalizeContents } from "../utils/entity";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse } from "./AssetsController";
import { AssetModel, IAssetDocument } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { IAuthRequest } from "../interfaces";
import { AssetExtensions, IRef, ITagContents, RefTypes } from "@djonnyx/tornado-types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITagAsset extends IAssetItem { }

interface ITagGetAllAssetsResponse {
    meta?: {};
    data?: {
        [lang: string]: Array<ITagAsset>,
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ITagGetAssetsResponse {
    meta?: {};
    data?: Array<ITagAsset>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ITagCreateAssetsResponse {
    meta?: {
        tag: {
            ref: IRef;
        };
        asset: {
            ref: IRef;
        };
    };
    data?: {
        asset: ITagAsset;
        tag: ITagItem;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ITagDeleteAssetsResponse {
    meta?: {
        tag: {
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

interface ITagAssetUpdateRequest {
    active: boolean;
    name: string;
}

export enum TagImageTypes {
    MAIN = "main",
    ICON = "icon",
}

const contentsToDefault = (contents: ITagContents, langCode: string) => {
    let result = { ...contents };
    if (!result) {
        result = {};
    }

    if (!result[langCode]) {
        result[langCode] = {} as any;
    }

    if (!result[langCode].resources) {
        result[langCode].resources = {
            main: null,
            icon: null,
        };
    }

    if (!result[langCode].assets) {
        result[langCode].assets = [];
    }

    return result;
}

const META_TEMPLATE = {
    tag: {
        ref: {
            name: RefTypes.SELECTORS,
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

@Route("/tag")
@Tags("Tag assets")
export class TagAssetsController extends Controller {
    @Get("{tagId}/assets")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<ITagGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            "RU": [RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(tagId: string): Promise<ITagGetAllAssetsResponse> {
        let tag: ITagDocument;
        try {
            tag = await TagModel.findById(tagId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Tag with id: "${tagId}" not found. ${err}`,
                    }
                ]
            };
        }

        const promises = new Array<Promise<{ assets: Array<IAssetDocument>, langCode: string }>>();

        for (const langCode in tag.contents) {
            promises.push(new Promise(async (resolve) => {
                const assets = await AssetModel.find({ _id: tag.contents[langCode].assets });
                resolve({ assets, langCode });
            }));
        }

        try {
            const assetsInfo = await Promise.all(promises);

            const result: {
                [lang: string]: Array<ITagAsset>,
            } = {};
            assetsInfo.forEach(assetInfo => {
                result[assetInfo.langCode] = assetInfo.assets.map(asset => formatAssetModel(asset));
            });

            return {
                meta: {},
                data: result,
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

    @Get("{tagId}/assets/{langCode}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("Get")
    @Example<ITagGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(tagId: string, langCode: string): Promise<ITagGetAssetsResponse> {
        let tag: ITagDocument;
        try {
            tag = await TagModel.findById(tagId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Tag with id: "${tagId}" not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const assets = await AssetModel.find({ _id: tag.contents[langCode].assets, });

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

    /*@Post("{tagId}/asset/{langCode}")
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<ITagCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            tag: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async create(tagId: string, langCode: string, @Request() request: express.Request): Promise<ITagCreateAssetsResponse> {
        let assetsInfo: ICreateAssetsResponse;
        try {
            assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA]);
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

        let tag: ITag;
        try {
            tag = await TagModel.findById(tagId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find tag error. ${err}`,
                    }
                ]
            };
        }

        const contents: ITagContents = contentsToDefault(tag.contents, langCode);

        let tagRef: IRef;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].assets.push(assetId);

            tag.contents = contents;
            tag.markModified("contents");

            tagRef = await riseRefVersion(RefTypes.SELECTORS);
            await tag.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to tag assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                tag: {
                    ref: tagRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                tag: formatTagModel(tag),
                asset: assetsInfo.data,
            }
        };
    }*/

    @Post("{tagId}/resource/{langCode}/{resourceType}")
    @Security("clientAccessToken")
    @OperationId("CreateResource")
    @Example<ITagCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            tag: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async resource(tagId: string, langCode: string, resourceType: TagImageTypes, @Request() request: IAuthRequest): Promise<ITagCreateAssetsResponse> {
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

        let tag: ITagDocument;
        let deletedAsset: string;
        try {
            tag = await TagModel.findById(tagId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find tag error. ${err}`,
                    }
                ]
            };
        }

        let defaultLanguage: ILanguageDocument;
        try {
            defaultLanguage = await LanguageModel.findOne({ client: request.account.id, isDefault: true });
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

        let contents: ITagContents = contentsToDefault(tag.contents, langCode);

        deletedAsset = !!contents[langCode] ? contents[langCode].resources[resourceType] : undefined;

        // детект количества повторяющихся изображений
        let isAssetExistsInOtherProps = 0;
        for (const contentLang in contents) {
            if (!!contents[contentLang].resources) {
                for (const img in contents[contentLang].resources) {
                    if (!!contents[contentLang].resources[img] && contents[contentLang].resources[img] === deletedAsset) {
                        isAssetExistsInOtherProps++;
                    }
                }
            }
        }

        // Удаление ассета только если он не используется в разных свойствах
        if (isAssetExistsInOtherProps !== 1) {
            deletedAsset = undefined;
        }

        const assetIndex = !!deletedAsset ? contents[langCode].assets.indexOf(deletedAsset) : -1;
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
            contents[langCode].assets = contents[langCode].assets.filter(asset => {
                return asset.toString() !== deletedAsset.toString();
            });
        }

        let tagRef: IRef;
        let savedTag: ITagDocument;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].resources[resourceType] = assetId;
            contents[langCode].assets.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            tag.contents = contents;
            tag.markModified("contents");

            savedTag = await tag.save();

            tagRef = await riseRefVersion(request.account.id, RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Save asset to tag assets list error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: {
                tag: {
                    ref: tagRef,
                },
                asset: {
                    ref: assetsInfo.meta.ref,
                }
            },
            data: {
                tag: formatTagModel(savedTag),
                asset: assetsInfo.data,
            }
        };
    }

    @Put("{tagId}/asset/{langCode}/{assetId}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<ITagCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            tag: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async update(tagId: string, langCode: string, assetId: string, @Body() body: ITagAssetUpdateRequest, @Request() request: IAuthRequest): Promise<ITagCreateAssetsResponse> {

        let tag: ITagDocument;
        try {
            tag = await TagModel.findById(tagId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Can not found tag error. ${err}`,
                    }
                ]
            };
        }

        let tagRef: IRef;
        try {
            tagRef = await getRef(request.account.id, RefTypes.SELECTORS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get tag ref error. ${err}`,
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
                    tag: {
                        ref: tagRef,
                    },
                },
                data: {
                    asset: formatAssetModel(item),
                    tag: formatTagModel(tag),
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

    @Delete("{tagId}/asset/{langCode}/{assetId}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<ITagDeleteAssetsResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(tagId: string, langCode: string, assetId: string, @Request() request: IAuthRequest): Promise<ITagDeleteAssetsResponse> {
        let tag: ITagDocument;
        try {
            tag = await TagModel.findById(tagId);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find tag error. ${err}`,
                    }
                ]
            };
        }

        let contents: ITagContents = contentsToDefault(tag.contents, langCode);

        let assetRef: IRef;
        const assetIndex = contents[langCode].assets.indexOf(assetId);
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

        let tagsRef: IRef;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            tag.contents = contents;
            tag.markModified("contents");

            await tag.save();

            tagsRef = await riseRefVersion(request.account.id, RefTypes.SELECTORS);
            return {
                meta: {
                    tag: {
                        ref: tagsRef,
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
                        message: `Save tag error. ${err}`,
                    }
                ]
            };
        }
    }
}
