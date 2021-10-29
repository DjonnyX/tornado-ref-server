import { ILanguageDocument, LanguageModel, TranslationModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatLanguageModel } from "../utils/language";
import { mergeTranslation } from "../utils/translation";
import { AssetModel } from "../models/Asset";
import { ASSET_RESPONSE_TEMPLATE, deleteAsset } from "./AssetsController";
import { IAuthRequest } from "../interfaces";
import { ILanguage, IRef, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";
import { TRANSLATION_RESPONSE_TEMPLATE } from "./TranslationController";

export interface ILanguageItem extends ILanguage { }

interface LanguageMeta {
    ref: IRef;
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
    isDefault: true,
    active: true,
    code: "RU",
    name: "Русский",
    assets: [
        ASSET_RESPONSE_TEMPLATE?.id,
    ],
    resources: {
        main: ASSET_RESPONSE_TEMPLATE?.id,
    },
    translation: TRANSLATION_RESPONSE_TEMPLATE?.id,
    extra: { key: "value" },
};

const META_TEMPLATE: LanguageMeta = {
    ref: {
        name: RefTypes.LANGUAGES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/languages")
@Tags("Language")
export class LanguagesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<LanguagesResponse>({
        meta: META_TEMPLATE,
        data: [LANGUAGE_RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<LanguagesResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(LanguageModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.LANGUAGES);
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<LanguageResponse> {
        const client = getClientId(request);

        try {
            const item = await LanguageModel.findById(id);
            const ref = await getRef(client, RefTypes.LANGUAGES);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: LanguageCreateRequest, @Request() request: IAuthRequest): Promise<LanguageResponse> {
        const client = getClientId(request);

        let langs: Array<ILanguageDocument>;

        try {
            langs = await LanguageModel.find({ client });
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

        let item: ILanguageDocument;
        let savedItem: ILanguageDocument;
        let ref: IRef;
        try {
            body.isDefault = langs.length === 0;
            item = new LanguageModel({ ...body, client: client });
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
                client: client,
                language: item.code,
            });

            mergeTranslation(translation, false);

            const savedTranslationItem = await translation.save();
            await riseRefVersion(client, RefTypes.TRANSLATIONS);

            item.translation = savedTranslationItem._id;

            savedItem = await item.save();
            ref = await riseRefVersion(client, RefTypes.LANGUAGES);

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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
        data: LANGUAGE_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: LanguageUpdateRequest, @Request() request: IAuthRequest): Promise<LanguageResponse> {
        const client = getClientId(request);

        let item: ILanguageDocument;

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
            const langs: Array<ILanguageDocument> = await LanguageModel.find({ client });

            const promises = new Array<Promise<void>>();

            if (isDefault) {
                langs.forEach(lang => {
                    if (lang.code !== languageCode) {
                        if (!!lang.isDefault) {
                            lang.isDefault = false;
                            promises.push(new Promise<void>(async (resolve, reject) => {
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
                let firstLang: ILanguageDocument;

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

                    promises.push(new Promise<void>(async (resolve, reject) => {
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
                const translation = await TranslationModel.findOne({ client, code: item.code });

                if (!!translation) {
                    translation.language = languageCode;

                    await translation.save();
                    await riseRefVersion(client, RefTypes.TRANSLATIONS);
                }
            }

            const ref = await riseRefVersion(client, RefTypes.LANGUAGES);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<LanguageResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<LanguageResponse> {
        const client = getClientId(request);

        let langs: Array<ILanguageDocument>;
        try {
            langs = await LanguageModel.find({ client });
        } catch (err) { }

        if (langs && langs.length === 1) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "There must be at least one language left.",
                    }
                ]
            };
        }

        let language: ILanguageDocument;
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

        const promises = new Array<Promise<void>>();

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
                await riseRefVersion(client, RefTypes.ASSETS);
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
            await riseRefVersion(client, RefTypes.TRANSLATIONS);
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
            const ref = await riseRefVersion(client, RefTypes.LANGUAGES);
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