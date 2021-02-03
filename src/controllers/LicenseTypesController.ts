import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { IRefItem } from "./RefsController";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";
import { RefTypes } from "@djonnyx/tornado-types";

interface ILicenseTypeInfo {
    id: string;
    name: string;
    description: string;
    price: number;
    payNotice: string;
    integrationId: string;
    lastUpdate: Date;
}

interface ICreateLicenseTypeParams {
    name: string;
    description?: string;
    price: number;
    payNotice: string;
    integrationId: string;
    lastUpdate?: string;
}

interface IUpdateLicenseTypeParams {
    name?: string;
    description?: string;
    price?: number;
    payNotice?: string;
    integrationId?: string;
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
    ref: IRefItem;
}

const LICENSE_TYPE_RESPONSE_TEMPLATE: ILicenseTypeInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    name: "Эвотор на 1 терминал",
    description: "Тариф на 3 месяца для интеграции с Эвотор",
    price: 180000,
    payNotice: "Оплата через терминал Эвотор",
    integrationId: "507c7f79bcf86cd7994f6c0e",
    lastUpdate: new Date(),
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
    @OperationId("GetAll")
    @Example<LicenseTypesGetResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_TYPE_RESPONSE_TEMPLATE],
    })
    public async getLicenseType(@Request() request: IAuthRequest): Promise<LicenseTypesGetResponse> {
        return await licServerApiService.getLicenseTypes(request.token);
    }
}

@Route("/license-type")
@Tags("LicenseType")
export class LicenseTypeController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async getLicenseType(id: string, @Request() request: IAuthRequest): Promise<LicenseTypeResponse> {
        return await licServerApiService.getLicenseType(id, request.token);
    }

    @Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async createLicenseType(@Body() body: ICreateLicenseTypeParams, @Request() request: IAuthRequest): Promise<LicenseTypeResponse> {
        return await licServerApiService.createLicenseType(body as any, request.token);
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async updateLicenseType(id: string, @Body() body: IUpdateLicenseTypeParams, @Request() request: IAuthRequest): Promise<LicenseTypeResponse> {
        return await licServerApiService.updateLicenseType(id, body as any, request.token);
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteLicenseType(id: string, @Request() request: IAuthRequest): Promise<LicenseTypeResponse> {
        return await licServerApiService.deleteLicenseType(id, request.token);
    }
}
