import { RefTypes, ILanguage, LanguageModel, TranslationModel, ITranslation } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { IRefItem } from "./RefsController";
import { formatLanguageModel } from "../utils/language";
import { mergeTranslation } from "../utils/translation";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";

export interface ILanguageItem {
    id: string;
    active: boolean;
    code: string;
    name: string;
    assets?: Array<string>;
    images?: {
        main?: string | null;
    };
    translation?: string | null;
    extra?: { [key: string]: any } | null;
}

interface LanguageMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface LanguagesResponse {
    meta?: LanguageMeta;
    data?: Array<ILanguageItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface LanguageResponse {
    meta?: LanguageMeta;
    data?: ILanguageItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface LanguageCreateRequest {
    active?: boolean;
    code: string;
    name: string;
    assets?: Array<string>;
    images?: {
        main?: string | null;
    };
    translation?: string | null;
    extra?: { [key: string]: any } | null;
}

interface LanguageUpdateRequest {
    active?: boolean;
    code?: string;
    name?: string;
    assets?: Array<string>;
    images?: {
        main?: string | null;
    };
    translation?: string | null;
    extra?: { [key: string]: any } | null;
}

export const LANGUAGE_RESPONSE_TEMPLATE: ILanguageItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    code: "RU",
    name: "Русский",
    assets: [
        "g8h07f79bcf86cd7994f9d7k",
    ],
    images: {
        main: "g8h07f79bcf86cd7994f9d7k",
    },
    translation: "409c7f79bcf86cd7994f6g1t",
    extra: { key: "value" },
};

const META_TEMPLATE: LanguageMeta = {
    ref: {
        name: RefTypes.LANGUAGES,
        version: 1,
        lastUpdate: 1589885721,
    }
};

@Route("/languages")
@Tags("Language")
export class LanguagesController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<LanguagesResponse>({
        meta: META_TEMPLATE,
        data: [LANGUAGE_RESPONSE_TEMPLATE],
    })
    public async getAll(): Promise<LanguagesResponse> {
        try {
            const items = await LanguageModel.find({});
            const ref = await getRef(RefTypes.LANGUAGES);
            return {
                meta: { ref },
                data: items.map(v => formatLanguageModel(v)),
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

@Route("/language")
@Tags("Language")
export class LanguageController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string): Promise<LanguageResponse> {
        try {
            const item = await LanguageModel.findById(id);
            const ref = await getRef(RefTypes.LANGUAGES);
            return {
                meta: { ref },
                data: formatLanguageModel(item),
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
    @Security("jwt")
    @OperationId("Create")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: LanguageCreateRequest): Promise<LanguageResponse> {
        let item: ILanguage;
        let savedItem: ILanguage;
        let ref: IRefItem;
        try {
            item = new LanguageModel(request);
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
            const translation = new TranslationModel({
                language: item.code,
            });

            mergeTranslation(translation, false);
            
            const savedTranslationItem = await translation.save();
            await riseRefVersion(RefTypes.TRANSLATION);

            item.translation = savedTranslationItem._id;

            savedItem = await item.save();
            ref = await riseRefVersion(RefTypes.LANGUAGES);

            return {
                meta: { ref },
                data: formatLanguageModel(savedItem),
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
    @Security("jwt")
    @OperationId("Update")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: LanguageUpdateRequest): Promise<LanguageResponse> {
        try {
            const item = await LanguageModel.findById(id);

            let languageCode: string;
            for (const key in request) {
                item[key] = request[key];

                if (key === "code") {
                    languageCode = request[key];
                }
                
                if (key === "extra") {
                    item.markModified(key);
                }
            }

            await item.save();

            if (!!languageCode) {
                const translation = await TranslationModel.findOne({ code: item.code });

                if (!!translation) {
                    translation.language = languageCode;

                    await translation.save();
                    await riseRefVersion(RefTypes.TRANSLATION);
                }
            }

            const ref = await riseRefVersion(RefTypes.LANGUAGES);
            return {
                meta: { ref },
                data: formatLanguageModel(item),
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
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string): Promise<LanguageResponse> {
        let language: ILanguage;
        try {
            language = await LanguageModel.findByIdAndDelete(id);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Find and delete language error. ${err}`,
                    }
                ]
            };
        }

        // нужно удалять ассеты
        const assetsList = language.assets;

        const promises = new Array<Promise<any>>();

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
                await riseRefVersion(RefTypes.ASSETS);
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
            const language = await LanguageModel.findOneAndDelete({ _id: id });

            await TranslationModel.findOneAndDelete({ _id: language.translation });
            await riseRefVersion(RefTypes.TRANSLATION);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Translation delete error. ${err}`,
                    }
                ]
            };
        }

        try {
            const ref = await riseRefVersion(RefTypes.LANGUAGES);
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