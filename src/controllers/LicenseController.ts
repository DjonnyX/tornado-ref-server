import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { IAuthRequest } from "../interfaces";
import { licServerApiService } from "../services";
import { ILicense, RefTypes, ILicenseAccount, IRef } from "@djonnyx/tornado-types";
import { ITerminalDocument, TerminalModel } from "../models";
import { getClientId } from "../utils/account";
import { ACCOUNT_RESPONSE_TEMPLATE } from "./AccountController";
import { TERMINAL_RESPONSE_TEMPLATE } from "./TerminalController";
import { SUBSCRIPTION_RESPONSE_TEMPLATE } from "./SubscriptionController";

interface ILicenseInfo extends ILicense { }

interface ILicenseAccountInfo extends ILicenseAccount { }

export interface ICreateLicenseParams {
    client: string;
    tarifId: string;
    subscriptionId: string;
    extra?: {
        [key: string]: any;
    } | null;
}

export interface IUpdateLicenseParams {
    client?: string;
    tarifId?: string;
    subscriptionId?: string;
    extra?: {
        [key: string]: any;
    } | null;
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
    ref: IRef;
}

export const LICENSE_RESPONSE_TEMPLATE: ILicenseInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    client: ACCOUNT_RESPONSE_TEMPLATE.id,
    subscriptionId: SUBSCRIPTION_RESPONSE_TEMPLATE?.id,
    subscription: SUBSCRIPTION_RESPONSE_TEMPLATE,
    createdDate: new Date(),
    key: "0000-1111-2222-3333",
    md5key: "1e0328629e0b73cfcb5cca8bdefb0b76",
    imei: "3425t42t543yt45t",
    lastUpdate: new Date(),
    extra: { key: "value" },
};

export const LICENSE_ACCOUNT_RESPONSE_TEMPLATE: ILicenseAccountInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    client: ACCOUNT_RESPONSE_TEMPLATE?.id,
    terminalId: TERMINAL_RESPONSE_TEMPLATE?.id,
    subscriptionId: SUBSCRIPTION_RESPONSE_TEMPLATE?.id,
    subscription: SUBSCRIPTION_RESPONSE_TEMPLATE,
    createdDate: new Date(),
    key: "0000-1111-2222-3333",
    md5key: "1e0328629e0b73cfcb5cca8bdefb0b76",
    imei: "3425t42t543yt45t",
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

@Route("/licenses/forClient")
@Tags("License")
export class LicensesForClientController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<LicensesAccountResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_ACCOUNT_RESPONSE_TEMPLATE],
    })
    public async getLicense(@Request() request: IAuthRequest): Promise<LicensesAccountResponse> {
        const client = getClientId(request);

        let response: LicensesResponse;
        try {
            response = await licServerApiService.getLicensesForClient<LicensesResponse>(request, { clientToken: request.token });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `getLicensesForClient error. ${err}`,
                    }
                ]
            };
        }

        if (!response.error) {
            let terminals: Array<ITerminalDocument>;
            try {
                terminals = await TerminalModel.find({ client });
            } catch (err) {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: `Find terminals error. ${err}`,
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
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async getLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const client = getClientId(request);

        const response = await licServerApiService.getLicenseForClient<LicenseResponse>(id, request, { clientToken: request.token });

        if (!response.error) {
            let terminal: ITerminalDocument;
            try {
                terminal = await TerminalModel.findOne({ client, licenseId: response.data.id });
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
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<LicensesResponse>({
        meta: META_TEMPLATE,
        data: [LICENSE_RESPONSE_TEMPLATE],
    })
    public async getLicenses(@Request() request: IAuthRequest): Promise<LicensesResponse> {
        const response = await licServerApiService.getLicenses(request);

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
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async getLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const response = await licServerApiService.getLicense(id, request);

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
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async createLicense(@Body() body: ICreateLicenseParams, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const response = await licServerApiService.createLicense(body as any, request);

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
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async updateLicense(id: string, @Body() body: IUpdateLicenseParams, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const response = await licServerApiService.updateLicense(id, body as any, request);

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
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<LicenseResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseResponse> {
        return await licServerApiService.deleteLicense(id, request);
    }

    @Put("unbind/{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Unbind")
    @Example<LicenseAccountResponse>({
        meta: META_TEMPLATE,
        data: LICENSE_ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async unbindLicense(id: string, @Request() request: IAuthRequest): Promise<LicenseAccountResponse> {
        const response = await licServerApiService.unbindLicense(id, request);

        if (!response.error) {
            let terminal: ITerminalDocument;
            try {
                terminal = await TerminalModel.findOne({ licenseId: response.data.id });
                terminal.licenseId = undefined;
                await terminal.save();
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
