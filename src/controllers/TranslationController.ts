import { TranslationModel } from "../models/index";
import { Controller, Route, Get, Put, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatTranslationModel } from "../utils/translation";
import { IAuthRequest } from "../interfaces";
import { IRef, RefTypes } from "@djonnyx/tornado-types";
import { ITranslate } from "@djonnyx/tornado-types/dist/interfaces/raw/ITranslation";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";
import { LANGUAGE_RESPONSE_TEMPLATE } from "./LanguagesController";

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
    ref: IRef;
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

interface TranslationUpdateRequest {
    language: string;
    items?: Array<ITranslate>;
    extra?: { [key: string]: any } | null;
}

export const TRANSLATION_RESPONSE_TEMPLATE: ITranslationItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    language: LANGUAGE_RESPONSE_TEMPLATE?.code,
    items: [{
        key: "take-away",
        value: "Взять с собой",
    }],
    extra: { key: "value" },
};

const META_TEMPLATE: TranslationMeta = {
    ref: {
        name: RefTypes.TRANSLATIONS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/translations")
@Tags("Translation")
export class TranslationsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<TranslationsResponse>({
        meta: META_TEMPLATE,
        data: [TRANSLATION_RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<TranslationsResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(TranslationModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.TRANSLATIONS);
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
        data: TRANSLATION_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<TranslationResponse> {
        const client = getClientId(request);

        try {
            const item = await TranslationModel.findById(id);
            const ref = await getRef(client, RefTypes.TRANSLATIONS);
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
        data: TRANSLATION_RESPONSE_TEMPLATE,
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
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<TranslationResponse>({
        meta: META_TEMPLATE,
        data: TRANSLATION_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: TranslationUpdateRequest, @Request() request: IAuthRequest): Promise<TranslationResponse> {
        const client = getClientId(request);

        try {
            const item = await TranslationModel.findById(id);

            for (const key in body) {
                if (key === "extra") {
                    item.extra = { ...item.extra, ...body[key] };
                    item.markModified(key);
                } else {
                    item[key] = body[key];
                }
            }

            await item.save();

            const ref = await riseRefVersion(client, RefTypes.TRANSLATIONS);
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
        @Security("integrationAccessToken")
        @Security("clientAccessToken")
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