import { RefTypes, TranslationModel, ITranslate } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatTranslationModel } from "../utils/translation";
import { IRefItem } from "./RefsController";

interface ITranslateItem {
    key: string;
    value?: string;
}

interface ITranslationItem {
    id: string;
    language: string;
    items: Array<ITranslateItem>;
    extra?: { [key: string]: any } | null;
}

interface TranslationMeta {
    ref: IRefItem;
}

interface TranslationsResponse {
    meta?: TranslationMeta;
    data?: Array<ITranslationItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface TranslationResponse {
    meta?: TranslationMeta;
    data?: ITranslationItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

/*interface TranslationCreateRequest {
    extra?: { [key: string]: any } | null;
}*/

interface TranslationUpdateRequest {
    language: string;
    items?: Array<ITranslate>;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ITranslationItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    language: "RU",
    items: [{
        key: "take-away",
        value: "Взять с собой",
    }],
    extra: { key: "value" },
};

const META_TEMPLATE: TranslationMeta = {
    ref: {
        name: RefTypes.TRANSLATION,
        version: 1,
        lastupdate: new Date(),
    }
};

@Route("/translations")
@Tags("Translation")
export class TranslationsController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<TranslationsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(): Promise<TranslationsResponse> {
        try {
            const items = await TranslationModel.find({});
            const ref = await getRef(RefTypes.TRANSLATIONS);
            return {
                meta: { ref },
                data: items.map(v => formatTranslationModel(v)),
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

@Route("/translation")
@Tags("Translation")
export class TranslationController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string): Promise<TranslationResponse> {
        try {
            const item = await TranslationModel.findById(id);
            const ref = await getRef(RefTypes.TRANSLATIONS);
            return {
                meta: { ref },
                data: formatTranslationModel(item),
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

    /*@Post()
    @Security("jwt")
    @OperationId("Create")
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: TranslationCreateRequest): Promise<TranslationResponse> {
        try {
            const item = new TranslationModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.TRANSLATIONS);
            return {
                meta: { ref },
                data: formatTranslationModel(savedItem),
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
    }*/

    @Put("{id}")
    @Security("jwt")
    @OperationId("Update")
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: TranslationUpdateRequest): Promise<TranslationResponse> {
        try {
            const item = await TranslationModel.findById(id);

            for (const key in request) {
                item[key] = request[key];
                if (key === "extra") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.TRANSLATIONS);
            return {
                meta: { ref },
                data: formatTranslationModel(item),
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
/*
    @Delete("{id}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string): Promise<TranslationResponse> {
        try {
            await TranslationModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.TRANSLATIONS);
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
    }*/
}