import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";
import { IAccount, IRef, RefTypes } from "@djonnyx/tornado-types";

interface IAccountModel extends IAccount { }

interface IUpdateAccountParams {
    firstName?: string;
    lastName?: string;
    email?: string;
}

interface AccountsGetResponse {
    meta?: IAccountModelMeta;
    data?: Array<IAccountModel>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface AccountResponse {
    meta?: IAccountModelMeta;
    data?: IAccountModel;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAccountModelMeta {
    ref: IRef;
}

const APPLICATION_RESPONSE_TEMPLATE: IAccountModel = {
    id: "507c7f79bcf86cd7994f6c0e",
    owner: "507c7f79bcf86cd7994f6c1t",
    firstName: "Bill",
    lastName: "Gates",
    email: "test@test.com",
};

const META_TEMPLATE: IAccountModelMeta = {
    ref: {
        name: RefTypes.ACCOUNTS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/accounts")
@Tags("Account")
export class AccountsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @OperationId("GetAll")
    @Example<AccountsGetResponse>({
        meta: META_TEMPLATE,
        data: [APPLICATION_RESPONSE_TEMPLATE],
    })
    public async getAccount(): Promise<AccountsGetResponse> {
        return await licServerApiService.getAccounts();
    }
}

@Route("/account")
@Tags("Account")
export class AccountController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async getAccount(id: string, @Request() request: IAuthRequest): Promise<AccountResponse> {
        return await licServerApiService.getAccount(id);
    }

    /*@Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async createAccount(@Body() body: ICreateAccountParams, @Request() request: IAuthRequest): Promise<AccountResponse> {
        return await licServerApiService.createAccount(body as any, request.token);
    }*/

    @Put("{id}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
        data: APPLICATION_RESPONSE_TEMPLATE,
    })
    public async updateAccount(id: string, @Body() body: IUpdateAccountParams, @Request() request: IAuthRequest): Promise<AccountResponse> {
        return await licServerApiService.updateAccount(id, body);
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteAccount(id: string, @Request() request: IAuthRequest): Promise<AccountResponse> {
        return await licServerApiService.deleteAccount(id);
    }
}
