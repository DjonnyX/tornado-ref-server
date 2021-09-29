import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";
import { IIntegration, IIntegrationServerInfo, IntegrationStates, IRef, RefTypes, UserRights } from "@djonnyx/tornado-types";

interface IIntegrationInfo extends IIntegration { }

interface ICreateIntegrationParams {
    host: string;
    verificationKey: string;
    active: boolean;
}

interface IUpdateIntegrationParams {
    host?: string;
    verificationKey?: string;
    active?: boolean;
}

interface IntegrationsGetResponse {
    meta?: IIntegrationInfoMeta;
    data?: Array<IIntegrationInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IntegrationResponse {
    meta?: IIntegrationInfoMeta;
    data?: IIntegrationInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IntegrationServerInfoResponse {
    meta?: IIntegrationInfoMeta;
    data?: IIntegrationServerInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IIntegrationInfoMeta {
    ref: IRef;
}

const INTEGRATION_SERVER_INFO_RESPONSE_TEMPLATE: IIntegrationServerInfo = {
    serverName: "Evotor",
    availableRights: [
        // Backups
        UserRights.VIEW_BACKUPS,
        UserRights.FORM_BACKUP,
        UserRights.UPLOAD_BACKUP,
        // Licenses
        UserRights.READ_LICENSES,
        UserRights.READ_LICENSE,
        UserRights.CREATE_LICENSE,
        UserRights.UPDATE_LICENSE,
        UserRights.DELETE_LICENSE,
        UserRights.REVOKE_LICENSE,
        // Languages
        UserRights.READ_LANGUAGES,
        UserRights.READ_LANGUAGE,
        UserRights.CREATE_LANGUAGE,
        UserRights.UPDATE_LANGUAGE,
        UserRights.DELETE_LANGUAGE,
    ],
    versionName: "Evo-5X",
    versionCode: 1,
    version: "1.0.23",
};

export const INTEGRATION_RESPONSE_TEMPLATE: IIntegration = {
    id: "507c7f79bcf86cd7994f6c0e",
    host: "http://127.0.0.1:8089/",
    verificationKey: "secure_key",
    name: "Evotor",
    rights: [
        // Backups
        UserRights.VIEW_BACKUPS,
        UserRights.FORM_BACKUP,
        UserRights.UPLOAD_BACKUP,
        // Licenses
        UserRights.READ_LICENSES,
        UserRights.READ_LICENSE,
        UserRights.CREATE_LICENSE,
        UserRights.UPDATE_LICENSE,
        UserRights.DELETE_LICENSE,
        UserRights.REVOKE_LICENSE,
        // Languages
        UserRights.READ_LANGUAGES,
        UserRights.READ_LANGUAGE,
        UserRights.CREATE_LANGUAGE,
        UserRights.UPDATE_LANGUAGE,
        UserRights.DELETE_LANGUAGE,
    ],
    version: {
        name: "Evo-5X",
        code: 1,
        version: "1.0.23",
    },
    active: true,
    state: IntegrationStates.WORK,
};

const META_TEMPLATE: IIntegrationInfoMeta = {
    ref: {
        name: RefTypes.INTEGRATIONS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/integrations")
@Tags("Integration")
export class IntegrationsController extends Controller {
    @Get()
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("GetAll")
    @Example<IntegrationsGetResponse>({
        meta: META_TEMPLATE,
        data: [INTEGRATION_RESPONSE_TEMPLATE],
    })
    public async getIntegration(@Request() request: IAuthRequest): Promise<IntegrationsGetResponse> {
        return await licServerApiService.getIntegrations(request);
    }
}

@Route("/integration")
@Tags("Integration")
export class IntegrationController extends Controller {
    @Post("/server-info")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("ServerInfo")
    @Example<IntegrationServerInfoResponse>({
        meta: META_TEMPLATE,
        data: INTEGRATION_SERVER_INFO_RESPONSE_TEMPLATE,
    })
    public async getServerInfo(@Body() body: { host: string }, @Request() request: IAuthRequest): Promise<IntegrationServerInfoResponse> {
        return await licServerApiService.getIntegrationServerInfo(body as any, request);
    }

    @Get("{id}")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<IntegrationResponse>({
        meta: META_TEMPLATE,
        data: INTEGRATION_RESPONSE_TEMPLATE,
    })
    public async getIntegration(id: string, @Request() request: IAuthRequest): Promise<IntegrationResponse> {
        return await licServerApiService.getIntegration(id, request);
    }

    @Post()
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<IntegrationResponse>({
        meta: META_TEMPLATE,
        data: INTEGRATION_RESPONSE_TEMPLATE,
    })
    public async createIntegration(@Body() body: ICreateIntegrationParams, @Request() request: IAuthRequest): Promise<IntegrationResponse> {
        return await licServerApiService.createIntegration(body as any, request);
    }

    @Put("{id}")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<IntegrationResponse>({
        meta: META_TEMPLATE,
        data: INTEGRATION_RESPONSE_TEMPLATE,
    })
    public async updateIntegration(id: string, @Body() body: IUpdateIntegrationParams, @Request() request: IAuthRequest): Promise<IntegrationResponse> {
        return await licServerApiService.updateIntegration(id, body as any, request);
    }

    @Delete("{id}")
    @Security("integrationAccessToken")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<IntegrationResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteIntegration(id: string, @Request() request: IAuthRequest): Promise<IntegrationResponse> {
        return await licServerApiService.deleteIntegration(id, request);
    }
}
