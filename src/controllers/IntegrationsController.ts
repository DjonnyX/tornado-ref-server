import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { IRefItem } from "./RefsController";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";
import { IntegrationStates, IVersion, RefTypes, UserRights } from "@djonnyx/tornado-types";

interface IIntegrationInfo {
    id: string;
    name: string;
    description: string;
    rights: Array<UserRights>;
    version: IVersion;
    state: IntegrationStates;
    lastUpdate: Date;
}

interface ICreateIntegrationParams {
    name: string;
    description?: string;
    rights: Array<UserRights>;
    version: IVersion;
    state: IntegrationStates;
    lastUpdate?: Date;
}

interface IUpdateIntegrationParams {
    name?: string;
    description?: string;
    rights?: Array<UserRights>;
    version?: IVersion;
    state?: IntegrationStates;
    lastUpdate?: Date;
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

interface IIntegrationInfoMeta {
    ref: IRefItem;
}

const APPLICATION_RESPONSE_TEMPLATE: IIntegrationInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    name: "Эвотор",
    description: "Интеграция с товароучетной системой \"Эвотор\"",
    rights: [
        UserRights.CREATE_PRODUCT,
        UserRights.DELETE_PRODUCT,
    ],
    version: {
        name: "Base",
        code: 1,
        version: "1.0.23",
    },
    state: IntegrationStates.ACTIVE,
    lastUpdate: new Date(),
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
    @OperationId("GetAll")
    @Example<IntegrationsGetResponse>({
        meta: META_TEMPLATE,
        data: [APPLICATION_RESPONSE_TEMPLATE],
    })
    public async getIntegration(@Request() request: IAuthRequest): Promise<IntegrationsGetResponse> {
        return await licServerApiService.getIntegrations(request.token);
    }
}

@Route("/integration")
@Tags("Integration")
export class IntegrationController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<IntegrationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async getIntegration(id: string, @Request() request: IAuthRequest): Promise<IntegrationResponse> {
        return await licServerApiService.getIntegration(id, request.token);
    }

    @Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<IntegrationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async createIntegration(@Body() body: ICreateIntegrationParams, @Request() request: IAuthRequest): Promise<IntegrationResponse> {
        return await licServerApiService.createIntegration(body as any, request.token);
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<IntegrationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async updateIntegration(id: string, @Body() body: IUpdateIntegrationParams, @Request() request: IAuthRequest): Promise<IntegrationResponse> {
        return await licServerApiService.updateIntegration(id, body as any, request.token);
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<IntegrationResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteIntegration(id: string, @Request() request: IAuthRequest): Promise<IntegrationResponse> {
        return await licServerApiService.deleteIntegration(id, request.token);
    }
}
