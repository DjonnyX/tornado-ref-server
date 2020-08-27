import * as express from "express";
import { TagModel, ITag, RefTypes, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Post, Tags, OperationId, Example, Request, Security, Get, Delete, Body, Put } from "tsoa";
import { riseRefVersion, getRef } from "../db/refs";
import { AssetExtensions } from "../models/enums";
import { ITagItem, RESPONSE_TEMPLATE as SELECTOR_RESPONSE_TEMPLATE } from "./TagsController";
import { formatTagModel } from "../utils/tag";
import { normalizeContents } from "../utils/entity";
import { IRefItem } from "./RefsController";
import { uploadAsset, deleteAsset, IAssetItem, ICreateAssetsResponse } from "./AssetsController";
import { AssetModel, IAsset } from "../models/Asset";
import { formatAssetModel } from "../utils/asset";
import { ITagContents } from "../models/Tag";

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
            ref: IRefItem;
        };
        asset: {
            ref: IRefItem;
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
        result[langCode] = {};
    }

    if (!result[langCode].images) {
        result[langCode].images = {
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

@Route("/tag")
@Tags("Tag assets")
export class TagAssetsController extends Controller {
    @Get("{tagId}/assets")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<ITagGetAllAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            "RU": [RESPONSE_TEMPLATE],
        },
    })
    public async getAllAssets(tagId: string): Promise<ITagGetAllAssetsResponse> {
        let tag: ITag;
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

        const promises = new Array<Promise<{ assets: Array<IAsset>, langCode: string }>>();

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
    @Security("jwt")
    @Security("apiKey")
    @OperationId("Get")
    @Example<ITagGetAssetsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAssets(tagId: string, langCode: string): Promise<ITagGetAssetsResponse> {
        let tag: ITag;
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
    @Security("jwt")
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

        let tagRef: IRefItem;
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

    @Post("{tagId}/image/{langCode}/{imageType}")
    @Security("jwt")
    @OperationId("CreateImage")
    @Example<ITagCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            tag: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async image(tagId: string, langCode: string, imageType: TagImageTypes, @Request() request: express.Request): Promise<ITagCreateAssetsResponse> {
        let assetsInfo: ICreateAssetsResponse;
        try {
            assetsInfo = await uploadAsset(request, [AssetExtensions.JPG, AssetExtensions.PNG, AssetExtensions.OBJ, AssetExtensions.FBX, AssetExtensions.COLLADA], false);
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

        let contents: ITagContents = contentsToDefault(tag.contents, langCode);

        deletedAsset = !!contents[langCode] ? contents[langCode].images[imageType] : undefined;

        // детект количества повторяющихся изображений
        let isAssetExistsInOtherProps = 0;
        for (const contentLang in contents) {
            if (!!contents[contentLang].images) {
                for (const img in contents[contentLang].images) {
                    if (!!contents[contentLang].images[img] && contents[contentLang].images[img] === deletedAsset) {
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
                    await riseRefVersion(RefTypes.ASSETS);
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

        let tagRef: IRefItem;
        let savedTag: ITag;
        try {
            const assetId = assetsInfo.data.id.toString();
            contents[langCode].images[imageType] = assetId;
            contents[langCode].assets.push(assetId);

            normalizeContents(contents, defaultLanguage.code);

            tag.contents = contents;
            tag.markModified("contents");

            savedTag = await tag.save();

            tagRef = await riseRefVersion(RefTypes.SELECTORS);
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
    @Security("jwt")
    @OperationId("Update")
    @Example<ITagCreateAssetsResponse>({
        meta: META_TEMPLATE,
        data: {
            asset: RESPONSE_TEMPLATE,
            tag: SELECTOR_RESPONSE_TEMPLATE,
        }
    })
    public async update(tagId: string, langCode: string, assetId: string, @Body() request: ITagAssetUpdateRequest): Promise<ITagCreateAssetsResponse> {

        let tag: ITag;
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

        let tagRef: IRefItem;
        try {
            tagRef = await getRef(RefTypes.SELECTORS);
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
    @Security("jwt")
    @OperationId("Delete")
    @Example<ITagDeleteAssetsResponse>({
        meta: META_TEMPLATE
    })
    public async delete(tagId: string, langCode: string, assetId: string): Promise<ITagDeleteAssetsResponse> {
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

        let contents: ITagContents = contentsToDefault(tag.contents, langCode);

        let assetRef: IRefItem;
        const assetIndex = contents[langCode].assets.indexOf(assetId);
        if (assetIndex > -1) {
            try {
                const asset = await AssetModel.findByIdAndDelete(assetId);
                if (!!asset) {
                    await deleteAsset(asset.path);
                    await deleteAsset(asset.mipmap.x128);
                    await deleteAsset(asset.mipmap.x32);
                    assetRef = await riseRefVersion(RefTypes.ASSETS);
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

        let tagsRef: IRefItem;
        try {
            contents[langCode].assets.splice(assetIndex, 1);

            tag.contents = contents;
            tag.markModified("contents");

            await tag.save();

            tagsRef = await riseRefVersion(RefTypes.SELECTORS);
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
