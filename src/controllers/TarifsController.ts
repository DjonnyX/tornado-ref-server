import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { licServerApiService } from "../services";
import { ITarif, IRef, IVersion, RefTypes, TarifPaymentPeriods } from "@djonnyx/tornado-types";
import { IAuthRequest } from "../interfaces";
import { APPLICATION_RESPONSE_TEMPLATE } from "./ApplicationController";

interface ITarifInfo extends ITarif { }

interface ICreateTarifParams {
    terminalType: number;
    productId: string;
    name: string;
    description?: string;
    version: IVersion;
    extra?: {
        [key: string]: any;
    } | null;
}

interface IUpdateTarifParams {
    terminalType?: number;
    productId?: string;
    name?: string;
    description?: string;
    version?: IVersion;
    extra?: {
        [key: string]: any;
    } | null;
}

interface TarifsGetResponse {
    meta?: ITarifInfoMeta;
    data?: Array<ITarifInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface TarifResponse {
    meta?: ITarifInfoMeta;
    data?: ITarifInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ITarifInfoMeta {
    ref: IRef;
}

export const TARIF_RESPONSE_TEMPLATE: ITarifInfo = {
    id: "435c7f79bcf86cd7994f6c1t",
    applicationId: APPLICATION_RESPONSE_TEMPLATE.id,
    application: APPLICATION_RESPONSE_TEMPLATE,
    serviceId: "KIOSK_TARIF_BASE_EVERY_MONTH",
    name: "Базовый",
    description: "Оплата раз в месяц. Если приобретено более 5 терминалов, скидка 10% с терминала.",
    trialPeriodDuration: 7,
    paymentPeriod: TarifPaymentPeriods.EVERY_MONTH,
    costByDevices: [
        {
            largeOrEqual: 1,
            cost: 2000,
        },
        {
            largeOrEqual: 5,
            cost: 1800,
        }
    ],
    extra: {},
};

const META_TEMPLATE: ITarifInfoMeta = {
    ref: {
        name: RefTypes.TARIFS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/tarifs")
@Tags("Tarif")
export class TarifsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<TarifsGetResponse>({
        meta: META_TEMPLATE,
        data: [TARIF_RESPONSE_TEMPLATE],
    })
    public async getTarif(@Request() request: IAuthRequest): Promise<TarifsGetResponse> {
        return await licServerApiService.getTarifs(request, { clientToken: request.token });
    }
}

@Route("/tarif")
@Tags("Tarif")
export class TarifController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<TarifResponse>({
        meta: META_TEMPLATE,
        data: TARIF_RESPONSE_TEMPLATE,
    })
    public async getTarif(id: string, @Request() request: IAuthRequest): Promise<TarifResponse> {
        return await licServerApiService.getTarif(id, request, { clientToken: request.token });
    }

    @Post()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<TarifResponse>({
        meta: META_TEMPLATE,
        data: TARIF_RESPONSE_TEMPLATE,
    })
    public async createTarif(@Body() body: ICreateTarifParams, @Request() request: IAuthRequest): Promise<TarifResponse> {
        return await licServerApiService.createTarif(body as any, request, { clientToken: request.token });
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<TarifResponse>({
        meta: META_TEMPLATE,
        data: TARIF_RESPONSE_TEMPLATE,
    })
    public async updateTarif(id: string, @Body() body: IUpdateTarifParams, @Request() request: IAuthRequest): Promise<TarifResponse> {
        return await licServerApiService.updateTarif(id, body as any, request, { clientToken: request.token });
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<TarifResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteTarif(id: string, @Request() request: IAuthRequest): Promise<TarifResponse> {
        return await licServerApiService.deleteTarif(id, request, { clientToken: request.token });
    }
}
