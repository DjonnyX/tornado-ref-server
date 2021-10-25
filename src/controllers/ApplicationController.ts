import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { licServerApiService } from "../services";
import { IApplication, IRef, IVersion, RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
import { IAuthRequest } from "../interfaces";

interface IApplicationInfo extends IApplication { }

interface ICreateApplicationParams {
    terminalType: number;
    productId: string;
    name: string;
    description?: string;
    version: IVersion;
    extra?: {
        [key: string]: any;
    } | null;
}

interface IUpdateApplicationParams {
    terminalType?: number;
    productId?: string;
    name?: string;
    description?: string;
    version?: IVersion;
    extra?: {
        [key: string]: any;
    } | null;
}

interface ApplicationsGetResponse {
    meta?: IApplicationInfoMeta;
    data?: Array<IApplicationInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ApplicationResponse {
    meta?: IApplicationInfoMeta;
    data?: IApplicationInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IApplicationInfoMeta {
    ref: IRef;
}

export const APPLICATION_RESPONSE_TEMPLATE: IApplicationInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    productId: "507c7f79bcf86cd7994f6c0e",
    terminalType: TerminalTypes.KIOSK,
    name: "Эвотор",
    description: "Интеграция с товароучетной системой \"Эвотор\"",
    version: {
        name: "Evolution",
        code: 1,
        version: "1.0.23",
    },
};

const META_TEMPLATE: IApplicationInfoMeta = {
    ref: {
        name: RefTypes.APPLICATIONS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/applications")
@Tags("Application")
export class ApplicationsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<ApplicationsGetResponse>({
        meta: META_TEMPLATE,
        data: [APPLICATION_RESPONSE_TEMPLATE],
    })
    public async getApplication(@Request() request: IAuthRequest): Promise<ApplicationsGetResponse> {
        return await licServerApiService.getApplications(request, { clientToken: request.token });
    }
}

@Route("/application")
@Tags("Application")
export class ApplicationController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<ApplicationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async getApplication(id: string, @Request() request: IAuthRequest): Promise<ApplicationResponse> {
        return await licServerApiService.getApplication(id, request, { clientToken: request.token });
    }

    @Post()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<ApplicationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async createApplication(@Body() body: ICreateApplicationParams, @Request() request: IAuthRequest): Promise<ApplicationResponse> {
        return await licServerApiService.createApplication(body as any, request, { clientToken: request.token });
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<ApplicationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async updateApplication(id: string, @Body() body: IUpdateApplicationParams, @Request() request: IAuthRequest): Promise<ApplicationResponse> {
        return await licServerApiService.updateApplication(id, body as any, request, { clientToken: request.token });
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<ApplicationResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteApplication(id: string, @Request() request: IAuthRequest): Promise<ApplicationResponse> {
        return await licServerApiService.deleteApplication(id, request, { clientToken: request.token });
    }
}
