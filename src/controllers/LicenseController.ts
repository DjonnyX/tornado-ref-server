import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import * as express from "express";
import { RefTypes } from "../models/enums";
import { LicenseStates } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStates";
import { LicenseStatuses } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStatuses";
import { IRefItem } from "./RefsController";
import { createProxyRequestToAuthServer } from "../utils/proxy";

interface ILicenseInfo {
    id: string;
    userId: string;
    dateStart: Date;
    dateEnd: Date;
    state: LicenseStates;
    status: LicenseStatuses;
    key: string;
    licTypeId: string;
    lastUpdate: Date;
    extra: { [key: string]: any } | null;
}

interface ICreateLicenseParams {
    userId: string;
    dateStart: Date;
    dateEnd: Date;
    state?: LicenseStates;
    status?: LicenseStatuses;
    key: string;
    licTypeId?: string;
    lastUpdate: Date;
    extra?: { [key: string]: any } | null;
}

interface IUpdateLicenseParams {
    dateStart?: Date;
    dateEnd?: Date;
    state?: LicenseStates;
    status?: LicenseStatuses;
    licTypeId?: string;
    extra?: { [key: string]: any } | null;
}

interface LicensesGetResponse {
    meta?: ILicenseInfoMeta;
    data?: Array<ILicenseInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface LicenseResponse {
    meta?: ILicenseInfoMeta;
    data?: ILicenseInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ILicenseInfoMeta {
    ref: IRefItem;
}

const LICENSE_RESPONSE_TEMPLATE: ILicenseInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    userId: "507c7f79bcf86cd7994f6c0e",
    dateStart: new Date(),
    dateEnd: new Date(),
    state: LicenseStates.ACTIVE,
    status: LicenseStatuses.NEW,
    key: "0000-1111-2222-3333",
    licTypeId: "507c7f79bcf86cd7994f6c0e",
    lastUpdate: new Date(),
    extra: { key: "value" },
};

const META_TEMPLATE: ILicenseInfoMeta = {
    ref: {
        name: RefTypes.LICENSES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/licenses")
@Tags("License")
export class LicensesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("accessToken")
    @OperationId("GetAll")
    @Example<LicensesGetResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_RESPONSE_TEMPLATE],
    })
    public async getLicense(@Request() request: express.Request): Promise<LicensesGetResponse> {
        return await createProxyRequestToAuthServer<LicensesGetResponse>(this, request);
    }
}

@Route("/license")
@Tags("License")
export class LicenseController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("accessToken")
    @OperationId("GetOne")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async getLicense(@Request() request: express.Request): Promise<LicenseResponse> {
        return await createProxyRequestToAuthServer<LicenseResponse>(this, request);
    }

    @Post("{id}")
    @Security("clientAccessToken")
    @Security("accessToken")
    @OperationId("Create")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async createLicense(@Request() request: express.Request, @Body() body: ICreateLicenseParams): Promise<LicenseResponse> {
        return await createProxyRequestToAuthServer<LicenseResponse>(this, request);
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("accessToken")
    @OperationId("Update")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async updateLicense(@Request() request: express.Request, @Body() body: IUpdateLicenseParams): Promise<LicenseResponse> {
        return await createProxyRequestToAuthServer<LicenseResponse>(this, request);
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @Security("accessToken")
    @OperationId("Delete")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteLicense(@Request() request: express.Request): Promise<LicenseResponse> {
        return await createProxyRequestToAuthServer<LicenseResponse>(this, request);
    }
}
