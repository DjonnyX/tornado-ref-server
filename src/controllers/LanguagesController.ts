import { RefTypes, ILanguage, LanguageModel, TranslationModel, ITranslation } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { IRefItem } from "./RefsController";
import { formatLanguageModel } from "../utils/language";
import { mergeTranslation } from "../utils/translation";
import { AssetModel } from "../models/Asset";
import { deleteAsset } from "./AssetsController";
import { IAuthRequest } from "../interfaces";

export interface ILanguageItem {
    id: string;
    isDefault?: boolean;
    active: boolean;
    code: string;
    name: string;
    assets?: Array<string>;
    resources?: {
        main?: string | null;
    };
    translation?: string | null;
    extra?: { [key: string]: any } | null;
}

interface LanguageMeta {
    ref: IRefItem;
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
    isDefault?: boolean;
    code: string;
    name: string;
    assets?: Array<string>;
    resources?: {
        main?: string | null;
    };
    translation?: string | null;
    extra?: { [key: string]: any } | null;
}

interface LanguageUpdateRequest {
    active?: boolean;
    isDefault?: boolean;
    code?: string;
    name?: string;
    assets?: Array<string>;
    resources?: {
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
    resources: {
        main: "g8h07f79bcf86cd7994f9d7k",
    },
    translation: "409c7f79bcf86cd7994f6g1t",
    extra: { key: "value" },
};

const META_TEMPLATE: LanguageMeta = {
    ref: {
        name: RefTypes.LANGUAGES,
        version: 1,
        lastupdate: new Date(),
    }
};

@Route("/languages")
@Tags("Language")
export class LanguagesController extends Controller {
    @Get()
    @Security("clientToken")
    @Security("serverToken")
    @OperationId("GetAll")
    @Example<LanguagesResponse>({
        meta: META_TEMPLATE,
        data: [LANGUAGE_RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<LanguagesResponse> {
        try {
            const items = await LanguageModel.find({ client: request.client.id });
            const ref = await getRef(request.client.id, RefTypes.LANGUAGES);
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
    @Security("clientToken")
    @Security("serverToken")
    @OperationId("GetOne")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<LanguageResponse> {
        try {
            const item = await LanguageModel.findById(id);
            const ref = await getRef(request.client.id, RefTypes.LANGUAGES);
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
    @Security("clientToken")
    @OperationId("Create")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: LanguageCreateRequest, @Request() request: IAuthRequest): Promise<LanguageResponse> {
        let langs: Array<ILanguage>;

        try {
            langs = await LanguageModel.find({ client: request.client.id });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get languages error. ${err}`,
                    }
                ]
            };
        }

        let item: ILanguage;
        let savedItem: ILanguage;
        let ref: IRefItem;
        try {
            body.isDefault = langs.length === 0;
            item = new LanguageModel({ ...body, client: request.client.id });
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
                client: request.client.id,
                language: item.code,
            });

            mergeTranslation(translation, false);

            const savedTranslationItem = await translation.save();
            await riseRefVersion(request.client.id, RefTypes.TRANSLATIONS);

            item.translation = savedTranslationItem._id;

            savedItem = await item.save();
            ref = await riseRefVersion(request.client.id, RefTypes.LANGUAGES);

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
    @Security("clientToken")
    @OperationId("Update")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: LanguageUpdateRequest, @Request() request: IAuthRequest): Promise<LanguageResponse> {
        let item: ILanguage;

        let isDefault: boolean;

        let languageCode: string;

        try {
            item = await LanguageModel.findById(id);
            for (const key in body) {
                item[key] = body[key];

                if (key === "code") {
                    languageCode = body[key];
                }

                if (key === "extra") {
                    item.markModified(key);
                }
            }
            isDefault = item.isDefault;

            await item.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Language save error. ${err}`,
                    }
                ]
            };
        }

        try {
            const langs: Array<ILanguage> = await LanguageModel.find({ client: request.client.id });

            const promises = new Array<Promise<any>>();

            if (isDefault) {
                langs.forEach(lang => {
                    if (lang.code !== languageCode) {
                        if (!!lang.isDefault) {
                            lang.isDefault = false;
                            promises.push(new Promise(async (resolve, reject) => {
                                try {
                                    await lang.save();
                                } catch (err) {
                                    reject(err);
                                }
                                resolve();
                            }));
                        }
                    }
                });
            } else {
                let needSetupDefault = true;
                let firstLang: ILanguage;

                langs.forEach(lang => {
                    if (!firstLang) {
                        firstLang = lang;
                    }

                    if (lang.isDefault) {
                        needSetupDefault = false;
                    }
                });

                if (needSetupDefault && firstLang) {
                    firstLang.isDefault = true;

                    promises.push(new Promise(async (resolve, reject) => {
                        try {
                            await firstLang.save();
                        } catch (err) {
                            reject(err);
                        }
                        resolve();
                    }));
                }
            }

            await Promise.all(promises);

        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Set default language error. ${err}`,
                    }
                ]
            };
        }

        try {
            await item.save();

            if (!!languageCode) {
                const translation = await TranslationModel.findOne({ client: request.client.id, code: item.code });

                if (!!translation) {
                    translation.language = languageCode;

                    await translation.save();
                    await riseRefVersion(request.client.id, RefTypes.TRANSLATIONS);
                }
            }

            const ref = await riseRefVersion(request.client.id, RefTypes.LANGUAGES);
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
    @Security("clientToken")
    @OperationId("Delete")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<LanguageResponse> {
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
                await riseRefVersion(request.client.id, RefTypes.ASSETS);
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
            await TranslationModel.findOneAndDelete({ _id: language.translation });
            await riseRefVersion(request.client.id, RefTypes.TRANSLATIONS);
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
            const ref = await riseRefVersion(request.client.id, RefTypes.LANGUAGES);
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