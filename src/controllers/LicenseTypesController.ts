import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { ILicenseType, IRef, RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";

interface ILicenseTypeInfo extends ILicenseType { }

interface ICreateLicenseTypeParams {
    name: string;
    applicationId: string;
    integrationId: string;
    description?: string;
    price: number;
    payNotice: string;
    extra?: { [key: string]: any } | null;
}

interface IUpdateLicenseTypeParams {
    name?: string;
    applicationId?: string;
    integrationId?: string;
    description?: string;
    price?: number;
    payNotice?: string;
    extra?: { [key: string]: any } | null;
}

interface LicenseTypesGetResponse {
    meta?: ILicenseTypeInfoMeta;
    data?: Array<ILicenseTypeInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface LicenseTypeResponse {
    meta?: ILicenseTypeInfoMeta;
    data?: ILicenseTypeInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ILicenseTypeInfoMeta {
    ref: IRef;
}

const LICENSE_TYPE_RESPONSE_TEMPLATE: ILicenseTypeInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    applicationId: "23r23r23f43412d33232",
    integrationId: "507c7f79bcf86cd7994f6c0e",
    name: "Эвотор на 1 терминал",
    description: "Тариф на 3 месяца для интеграции с Эвотор",
    price: 180000,
    payNotice: "Оплата через терминал Эвотор",
    extra: {},
};

const META_TEMPLATE: ILicenseTypeInfoMeta = {
    ref: {
        name: RefTypes.LICENSE_TYPES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/license-types")
@Tags("LicenseType")
export class LicenseTypesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<LicenseTypesGetResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_TYPE_RESPONSE_TEMPLATE],
    })
    public async getLicenseType(@Request() request: IAuthRequest): Promise<LicenseTypesGetResponse> {
        return await licServerApiService.getLicenseTypes(request, { clientToken: request.token });
    }
}

@Route("/license-type")
@Tags("LicenseType")
export class LicenseTypeController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async getLicenseType(id: string, @Request() request: IAuthRequest): Promise<LicenseTypeResponse> {
        return await licServerApiService.getLicenseType(id, request, { clientToken: request.token });
    }

    @Post()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async createLicenseType(@Body() body: ICreateLicenseTypeParams, @Request() request: IAuthRequest): Promise<LicenseTypeResponse> {
        return await licServerApiService.createLicenseType(body as any, request, { clientToken: request.token });
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async updateLicenseType(id: string, @Body() body: IUpdateLicenseTypeParams, @Request() request: IAuthRequest): Promise<LicenseTypeResponse> {
        return await licServerApiService.updateLicenseType(id, body as any, request, { clientToken: request.token });
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteLicenseType(id: string, @Request() request: IAuthRequest): Promise<LicenseTypeResponse> {
        return await licServerApiService.deleteLicenseType(id, request, { clientToken: request.token });
    }
}
