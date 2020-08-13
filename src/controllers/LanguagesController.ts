import { RefTypes, ILanguage, LanguageModel, TranslationModel, ITranslation } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { IRefItem } from "./RefsController";
import { formatLanguageModel } from "../utils/language";

export interface ILanguageItem {
    id: string;
    active: boolean;
    name: string;
    description?: string;
    color?: string;
    assets?: Array<string>;
    images?: {
        original?: string | null;
        icon?: string | null;
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
    name: string;
    description?: string;
    color?: string;
    assets?: Array<string>;
    images?: {
        main?: string | null;
        icon?: string | null;
    };
    translation?: string | null;
    extra?: { [key: string]: any } | null;
}

interface LanguageUpdateRequest {
    active?: boolean;
    name?: string;
    description?: string;
    color?: string;
    assets?: Array<string>;
    images?: {
        main?: string | null;
        icon?: string | null;
    };
    translation?: string | null;
    extra?: { [key: string]: any } | null;
}

export const LANGUAGE_RESPONSE_TEMPLATE: ILanguageItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    name: "Rus",
    description: "Русский",
    color: "#000000",
    assets: [
        "g8h07f79bcf86cd7994f9d7k",
    ],
    images: {
        original: "g8h07f79bcf86cd7994f9d7k",
        icon: "g8h07f79bcf86cd7994f9d7k",
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
            const translation = new TranslationModel();
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

            for (const key in request) {
                item[key] = request[key];
            }

            await item.save();

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
        try {
            await LanguageModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.LANGUAGES);
            return {
                meta: { ref },
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