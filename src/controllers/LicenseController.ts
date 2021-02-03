import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security, Query } from "tsoa";
import { LicenseStates } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStates";
import { LicenseStatuses } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStatuses";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";
import { licServerApiService } from "../services";
import { ILicense, RefTypes } from "@djonnyx/tornado-types";

interface ILicenseInfo extends ILicense { }

interface ICreateLicenseParams {
    clientId: string;
    dateStart: Date;
    dateEnd: Date;
    state: LicenseStates;
    status: LicenseStatuses;
    licTypeId: string;
}

interface IUpdateLicenseParams {
    clientId?: string;
    dateStart?: Date;
    dateEnd?: Date;
    state?: LicenseStates;
    status?: LicenseStatuses;
    licTypeId?: string;
}

interface LicenseVerifyResponse {
    meta?: ILicenseInfoMeta;
    data?: {
        license: ILicenseInfo;
        client: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface LicensesResponse {
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
    clientId: "507c7f79bcf86cd7994f6c0e",
    dateStart: new Date(),
    dateEnd: new Date(),
    state: LicenseStates.ACTIVE,
    status: LicenseStatuses.NEW,
    key: "0000-1111-2222-3333",
    md5key: "1e0328629e0b73cfcb5cca8bdefb0b76",
    imei: "3425t42t543yt45t",
    licType: {
        description: "Киоск с кассой r-keeper",
        name: "Киоск с кассой r-keeper",
        payNotice: "оплата лицензии осуществляется в личном кабинете пользователя",
        price: 100000,
        integrationId: "507c7f79bcf86cd7994f6c0e",
    },
    licTypeId: "ecbbfd40-62ba-49bf-8620-75d8c5ed3953",
    lastUpdate: new Date(),
};

const META_TEMPLATE: ILicenseInfoMeta = {
    ref: {
        name: RefTypes.LICENSES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/licenses/forClient")
@Tags("License")
export class LicensesForClientController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @OperationId("GetAll")
    @Example<LicensesResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_RESPONSE_TEMPLATE],
    })
    public async getLicense(@Request() request: IAuthRequest): Promise<LicensesResponse> {
        return await licServerApiService.getLicensesForClient(request.token);
    }
}

@Route("/license/forClient")
@Tags("License")
export class LicenseForClientController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async getLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseResponse> {
        return await licServerApiService.getLicenseForClient(id, request.token);
    }
}

@Route("/licenses")
@Tags("License")
export class LicensesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @OperationId("GetAll")
    @Example<LicensesResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_RESPONSE_TEMPLATE],
    })
    public async getLicenses(): Promise<LicensesResponse> {
        return await licServerApiService.getLicenses();
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
    public async getLicense(id: string): Promise<LicenseResponse> {
        return await licServerApiService.getLicense(id);
    }

    @Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async createLicense(@Body() body: ICreateLicenseParams): Promise<LicenseResponse> {
        return await licServerApiService.createLicense(body as any);
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async updateLicense(id: string, @Body() body: IUpdateLicenseParams): Promise<LicenseResponse> {
        return await licServerApiService.updateLicense(id, body as any);
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteLicense(id: string): Promise<LicenseResponse> {
        return await licServerApiService.deleteLicense(id);
    }
}
