import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security, Query } from "tsoa";
import { RefTypes } from "../models/enums";
import { LicenseStates } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStates";
import { LicenseStatuses } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStatuses";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";
import { licServerApiService } from "../services";
import { ILicense } from "@djonnyx/tornado-types";

interface ILicenseInfo extends ILicense { }

/*interface ICreateLicenseParams {
    clientId: string;
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
}*/

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
        return await licServerApiService.getLicenses(request.token);
    }
}

/*@Route("/license/verify")
@Tags("License")
export class LicenseCheckController extends Controller {
    @Get()
    @Security("terminalAccessToken")
    @OperationId("Verify")
    @Example<LicenseVerifyResponse>({
        meta: META_TEMPLATE,
        data: {
            license: LICENSE_RESPONSE_TEMPLATE,
            client: {
                id: "1234324234234",
                firstName: "First name",
                lastName: "Last name",
                email: "client@test.com"
            }
        },
    })
    public async verifyLicense(@Request() request: IAuthRequest): Promise<LicenseVerifyResponse> {
        let req: any;
        try {
            req = await licServerApiService.verifyLicenseKey(request.token);
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
        return req;
    }
}*/

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
        return await licServerApiService.getLicense(id, request.token);
    }

    /*@Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async createLicense(@Request() request: IAuthRequest, @Body() body: ICreateLicenseParams): Promise<LicenseResponse> {
        return await licServerApiService.createLicense(body as any);
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_RESPONSE_TEMPLATE,
    })
    public async updateLicense(id: string, @Request() request: IAuthRequest, @Body() body: IUpdateLicenseParams): Promise<LicenseResponse> {
        return await licServerApiService.updateLicense(id, body as any);
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseResponse> {
        return await licServerApiService.deleteLicense(id);
    }*/
}
