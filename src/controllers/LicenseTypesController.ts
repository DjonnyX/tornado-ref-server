import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import * as express from "express";
import { RefTypes } from "../models/enums";
import { IRefItem } from "./RefsController";
import { createProxyRequestToAuthServer } from "../utils/proxy";

interface ILicenseTypeInfo {
    id: string;
    name: string;
    description: string;
    price: number;
    payNotice: string;
    integrationId: string;
    lastUpdate: Date;
    extra?: { [key: string]: any } | null;
}

interface ICreateLicenseTypeParams {
    name: string;
    description?: string;
    price: number;
    payNotice: string;
    integrationId: string;
    extra?: { [key: string]: any } | null;
}

interface IUpdateLicenseTypeParams {
    name?: string;
    description?: string;
    price?: number;
    payNotice?: string;
    integrationId?: string;
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
    extra: { key: "value" },
};

const META_TEMPLATE: ILicenseTypeInfoMeta = {
    ref: {
        name: RefTypes.LICENSE_TYPES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/licenses")
@Tags("LicenseType")
export class LicenseTypesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @OperationId("GetAll")
    @Example<LicenseTypesGetResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_TYPE_RESPONSE_TEMPLATE],
    })
    public async getLicenseType(@Request() request: express.Request): Promise<LicenseTypesGetResponse> {
        return await createProxyRequestToAuthServer<LicenseTypesGetResponse>(this, request);
    }
}

@Route("/license-types")
@Tags("LicenseType")
export class LicenseTypeController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async getLicenseType(@Request() request: express.Request): Promise<LicenseTypeResponse> {
        return await createProxyRequestToAuthServer<LicenseTypeResponse>(this, request);
    }

    @Post("{id}")
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async createLicenseType(@Request() request: express.Request, @Body() body: ICreateLicenseTypeParams): Promise<LicenseTypeResponse> {
        return await createProxyRequestToAuthServer<LicenseTypeResponse>(this, request);
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_TYPE_RESPONSE_TEMPLATE,
    })
    public async updateLicenseType(@Request() request: express.Request, @Body() body: IUpdateLicenseTypeParams): Promise<LicenseTypeResponse> {
        return await createProxyRequestToAuthServer<LicenseTypeResponse>(this, request);
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<LicenseTypeResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteLicenseType(@Request() request: express.Request): Promise<LicenseTypeResponse> {
        return await createProxyRequestToAuthServer<LicenseTypeResponse>(this, request);
    }
}
