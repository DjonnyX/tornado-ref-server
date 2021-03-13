import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security, Query } from "tsoa";
import { LicenseStates } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStates";
import { LicenseStatuses } from "@djonnyx/tornado-types/dist/interfaces/raw/LicenseStatuses";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";
import { licServerApiService } from "../services";
import { ILicense, RefTypes, ILicenseAccount, TerminalTypes } from "@djonnyx/tornado-types";
import { ITerminalDocument, TerminalModel } from "../models";

interface ILicenseInfo extends ILicense { }

interface ILicenseAccountInfo extends ILicenseAccount { }

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

interface LicensesAccountResponse {
    meta?: ILicenseInfoMeta;
    data?: Array<ILicenseAccountInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface LicenseAccountResponse {
    meta?: ILicenseInfoMeta;
    data?: ILicenseAccountInfo;
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
        appType: TerminalTypes.KIOSK,
        description: "Киоск с кассой r-keeper",
        name: "Киоск с кассой r-keeper",
        payNotice: "оплата лицензии осуществляется в личном кабинете пользователя",
        price: 100000,
        integrationId: "507c7f79bcf86cd7994f6c0e",
    },
    licTypeId: "ecbbfd40-62ba-49bf-8620-75d8c5ed3953",
    lastUpdate: new Date(),
};

const LICENSE_ACCOUNT_RESPONSE_TEMPLATE: ILicenseAccountInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    clientId: "507c7f79bcf86cd7994f6c0e",
    terminalId: "507c7f79bcf86cd7994f6c0e",
    dateStart: new Date(),
    dateEnd: new Date(),
    state: LicenseStates.ACTIVE,
    status: LicenseStatuses.NEW,
    key: "0000-1111-2222-3333",
    md5key: "1e0328629e0b73cfcb5cca8bdefb0b76",
    imei: "3425t42t543yt45t",
    licType: {
        appType: TerminalTypes.KIOSK,
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
    @Example<LicensesAccountResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_ACCOUNT_RESPONSE_TEMPLATE],
    })
    public async getLicense(@Request() request: IAuthRequest): Promise<LicensesAccountResponse> {
        const response = await licServerApiService.getLicensesForClient<LicensesResponse>(request.token);

        if (!response.error) {
            let terminals: Array<ITerminalDocument>;
            try {
                terminals = await TerminalModel.find({ clientId: request.account.id });
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

            const terminalsMap: { [id: string]: ITerminalDocument } = {};
            terminals.forEach(t => {
                terminalsMap[t.licenseId] = t;
            });

            return {
                meta: response.meta,
                data: response.data.map(l => ({ ...l, terminalId: !!terminalsMap[l.id] ? terminalsMap[l.id]._id : undefined })),
            }
        }

        return response as LicensesAccountResponse;
    }
}

@Route("/license/forClient")
@Tags("License")
export class LicenseForClientController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async getLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const response = await licServerApiService.getLicenseForClient<LicenseResponse>(id, request.token);

        if (!response.error) {
            let terminal: ITerminalDocument;
            try {
                terminal = await TerminalModel.findOne({ clientId: request.account.id, licenseId: response.data.id });
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

            return {
                meta: response.meta,
                data: ({ ...response.data, terminalId: !!terminal ? terminal._id : undefined }),
            }
        }

        return response as LicenseAccountResponse;
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
    public async getLicenses(@Request() request: IAuthRequest): Promise<LicensesResponse> {
        const response = await licServerApiService.getLicenses();

        if (!response.error) {
            let terminals: Array<ITerminalDocument>;
            try {
                terminals = await TerminalModel.find({});
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

            const terminalsMap: { [id: string]: ITerminalDocument } = {};
            terminals.forEach(t => {
                terminalsMap[t.licenseId] = t;
            });

            return {
                meta: response.meta,
                data: response.data.map(l => ({ ...l, terminalId: !!terminalsMap[l.id] ? terminalsMap[l.id]._id : undefined })),
            }
        }

        return response as LicensesAccountResponse;
    }
}

@Route("/license")
@Tags("License")
export class LicenseController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async getLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const response = await licServerApiService.getLicense(id);

        if (!response.error) {
            let terminal: ITerminalDocument;
            try {
                terminal = await TerminalModel.findOne({ licenseId: response.data.id });
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

            return {
                meta: response.meta,
                data: ({ ...response.data, terminalId: !!terminal ? terminal._id : undefined }),
            }
        }

        return response as LicenseAccountResponse;
    }

    @Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async createLicense(@Body() body: ICreateLicenseParams, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const response = await licServerApiService.createLicense(body as any);

        if (!response.error) {
            let terminal: ITerminalDocument;
            try {
                terminal = await TerminalModel.findOne({ licenseId: response.data.id });
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

            return {
                meta: response.meta,
                data: ({ ...response.data, terminalId: !!terminal ? terminal._id : undefined }),
            }
        }

        return response as LicenseAccountResponse;
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async updateLicense(id: string, @Body() body: IUpdateLicenseParams, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const response = await licServerApiService.updateLicense(id, body as any);

        if (!response.error) {
            let terminal: ITerminalDocument;
            try {
                terminal = await TerminalModel.findOne({ licenseId: response.data.id });
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

            return {
                meta: response.meta,
                data: ({ ...response.data, terminalId: !!terminal ? terminal._id : undefined }),
            }
        }

        return response as LicenseAccountResponse;
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
