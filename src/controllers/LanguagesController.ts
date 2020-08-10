import { RefTypes, ILanguage, LanguageModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";

interface ILanguageItem {
    id: string;
    active: boolean;
    name: string;
    description?: string;
    color?: string;
    assets?: Array<string>;
    images?: {
        main?: string | null;
        icon?: string | null;
    };
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
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ILanguageItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    name: "Rus",
    description: "Русский",
    color: "#000000",
    assets: [
        "g8h07f79bcf86cd7994f9d7k",
    ],
    images: {
        main: "g8h07f79bcf86cd7994f9d7k",
        icon: "g8h07f79bcf86cd7994f9d7k",
    },
    extra: { key: "value" },
};

const formatModel = (model: ILanguage) => ({
    id: model._id,
    active: model.active,
    name: model.name,
    description: model.description,
    assets: model.assets,
    images: model.images || {
        main: null,
        icon: null,
    },
    extra: model.extra,
});

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
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(): Promise<LanguagesResponse> {
        try {
            const items = await LanguageModel.find({});
            const ref = await getRef(RefTypes.LANGUAGES);
            return {
                meta: { ref },
                data: items.map(v => formatModel(v)),
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
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string): Promise<LanguageResponse> {
        try {
            const item = await LanguageModel.findById(id);
            const ref = await getRef(RefTypes.LANGUAGES);
            return {
                meta: { ref },
                data: formatModel(item),
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
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: LanguageCreateRequest): Promise<LanguageResponse> {
        try {
            const item = new LanguageModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.LANGUAGES);
            return {
                meta: { ref },
                data: formatModel(savedItem),
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
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: LanguageCreateRequest): Promise<LanguageResponse> {
        try {
            const item = await LanguageModel.findById(id);

            for (const key in request) {
                item[key] = request[key];
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.LANGUAGES);
            return {
                meta: { ref },
                data: formatModel(item),
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