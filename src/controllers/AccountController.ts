import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { IRefItem } from "./RefsController";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";
import { IAccount, RefTypes } from "@djonnyx/tornado-types";

interface IAccountInfo extends IAccount { }

interface IUpdateAccountParams {
    firstName?: string;
    lastName?: string;
    email?: string;
}

interface AccountsGetResponse {
    meta?: IAccountInfoMeta;
    data?: Array<IAccountInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface AccountResponse {
    meta?: IAccountInfoMeta;
    data?: IAccountInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAccountInfoMeta {
    ref: IRefItem;
}

const APPLICATION_RESPONSE_TEMPLATE: IAccountInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    firstName: "Bill",
    lastName: "Gates",
    email: "test@test.com",
};

const META_TEMPLATE: IAccountInfoMeta = {
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
        return await licServerApiService.updateAccount(id);
    }

    /*@Delete("{id}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteAccount(id: string, @Request() request: IAuthRequest): Promise<AccountResponse> {
        return await licServerApiService.deleteAccount(id, request.token);
    }*/
}
