import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { RefTypes } from "../models/enums";
import { LicenseStates } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStates";
import { LicenseStatuses } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStatuses";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";
import { licServerApiService } from "../services";

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
    @OperationId("GetAll")
    @Example<LicensesGetResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_RESPONSE_TEMPLATE],
    })
    public async getLicense(@Request() request: IAuthRequest): Promise<LicensesGetResponse> {
        return await licServerApiService.getLicenses({ clientToken: request.token });
    }
}

@Route("/license")
@Tags("License")
export class LicenseController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async getLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseResponse> {
        return await licServerApiService.getLicense(id, { clientToken: request.token });
    }

    @Post("{id}")
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async createLicense(id: string, @Request() request: IAuthRequest, @Body() body: ICreateLicenseParams): Promise<LicenseResponse> {
        return await licServerApiService.createLicense(id, body as any, { clientToken: request.token });
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async updateLicense(id: string, @Request() request: IAuthRequest, @Body() body: IUpdateLicenseParams): Promise<LicenseResponse> {
        return await licServerApiService.updateLicense(id, body as any, { clientToken: request.token });
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseResponse> {
        return await licServerApiService.deleteLicense(id, { clientToken: request.token });
    }
}
