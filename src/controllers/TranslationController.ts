import { RefTypes, ITranslation, TranslationModel } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";

interface ITranslationItem {
    id: string;
    key: string;
    value: string;
    extra?: { [key: string]: any } | null;
}

interface TranslationMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
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

interface TranslationCreateRequest {
    active?: boolean;
    key: string;
    value: string;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ITranslationItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    key: "take-away",
    value: "Взять с собой",
    extra: { key: "value" },
};

const formatModel = (model: ITranslation) => ({
    id: model._id,
    key: model.key,
    value: model.value,
    extra: model.extra,
});

const META_TEMPLATE: TranslationMeta = {
    ref: {
        name: RefTypes.TRANSLATION,
        version: 1,
        lastUpdate: 1589885721,
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
            const ref = await getRef(RefTypes.TRANSLATION);
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
            const ref = await getRef(RefTypes.TRANSLATION);
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
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: TranslationCreateRequest): Promise<TranslationResponse> {
        try {
            const item = new TranslationModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.TRANSLATION);
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
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() request: TranslationCreateRequest): Promise<TranslationResponse> {
        try {
            const item = await TranslationModel.findById(id);

            for (const key in request) {
                item[key] = request[key];
            }

            await item.save();

            const ref = await riseRefVersion(RefTypes.TRANSLATION);
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
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string): Promise<TranslationResponse> {
        try {
            await TranslationModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(RefTypes.TRANSLATION);
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