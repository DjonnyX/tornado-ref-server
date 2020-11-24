import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { RefTypes } from "../models/enums";
import { IRefItem } from "./RefsController";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";
import { IVersion } from "@djonnyx/tornado-types";

interface IApplicationInfo {
    id: string;
    name: string;
    description: string;
    version: IVersion;
    state: number;
    lastUpdate: Date;
}

interface ICreateApplicationParams {
    name: string;
    description?: string;
    version: IVersion;
    state: number;
    lastUpdate?: Date;
}

interface IUpdateApplicationParams {
    name?: string;
    description?: string;
    version?: IVersion;
    state?: number;
    lastUpdate?: Date;
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
    ref: IRefItem;
}

const APPLICATION_RESPONSE_TEMPLATE: IApplicationInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    name: "Эвотор",
    description: "Интеграция с товароучетной системой \"Эвотор\"",
    version: {
        name: "Lolipop",
        code: 1,
        version: "1.0.23",
    },
    state: 0,
    lastUpdate: new Date(),
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
    @OperationId("GetAll")
    @Example<ApplicationsGetResponse>({
        meta: META_TEMPLATE,
        data: [APPLICATION_RESPONSE_TEMPLATE],
    })
    public async getApplication(@Request() request: IAuthRequest): Promise<ApplicationsGetResponse> {
        return await licServerApiService.getApplications({ clientToken: request.token });
    }
}

@Route("/application")
@Tags("Application")
export class ApplicationController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<ApplicationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async getApplication(id: string, @Request() request: IAuthRequest): Promise<ApplicationResponse> {
        return await licServerApiService.getApplication(id, { clientToken: request.token });
    }

    @Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<ApplicationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async createApplication(@Request() request: IAuthRequest, @Body() body: ICreateApplicationParams): Promise<ApplicationResponse> {
        return await licServerApiService.createApplication(body as any);
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<ApplicationResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async updateApplication(id: string, @Request() request: IAuthRequest, @Body() body: IUpdateApplicationParams): Promise<ApplicationResponse> {
        return await licServerApiService.updateApplication(id, body as any);
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<ApplicationResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteApplication(id: string, @Request() request: IAuthRequest): Promise<ApplicationResponse> {
        return await licServerApiService.deleteApplication(id);
    }
}
