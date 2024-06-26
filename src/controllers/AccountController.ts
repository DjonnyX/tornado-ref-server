import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security, Query } from "tsoa";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";
import { DefaultRoleTypes, IAccount, IAccountInfo, IRef, RefTypes } from "@djonnyx/tornado-types";
import express = require("express");
import { ROLE_RESPONSE_TEMPLATE } from "./RoleController";
import { INTEGRATION_RESPONSE_TEMPLATE } from "./IntegrationsController";

interface IAccountModel extends IAccount { }

interface ICreateAccountParams {
    captchaId: string;
    captchaValue: string;
    roleType: DefaultRoleTypes | string;
    firstName: string;
    lastName: string;
    email: string;
}

interface IUpdateAccountParams {
    roleType?: DefaultRoleTypes | string;
    firstName?: string;
    lastName?: string;
    integrationId?: string | null;
    email?: string;
    extra?: {
        [key: string]: any;
    } | null;
}

interface AccountsGetResponse {
    meta?: IAccountModelMeta;
    data?: Array<IAccountInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface AccountResponse {
    meta?: IAccountModelMeta;
    data?: IAccountInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAccountModelMeta {
    ref: IRef;
}

export const ACCOUNT_RESPONSE_TEMPLATE: IAccountInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    owner: "507c7f79bcf86cd7994f6c1f",
    roleType: DefaultRoleTypes.EMPLOYEE,
    role: ROLE_RESPONSE_TEMPLATE,
    integrationId: INTEGRATION_RESPONSE_TEMPLATE?.id,
    integration: INTEGRATION_RESPONSE_TEMPLATE,
    firstName: "Bill",
    lastName: "Gates",
    email: "test@test.com",
    extra: { key: "value" },
};

const META_TEMPLATE: IAccountModelMeta = {
    ref: {
        name: RefTypes.ACCOUNTS,
        version: 1,
        lastUpdate: new Date(),
    }
};

interface IResetEmailParams {
    restoreEmailCode: string;
    email: string;
}

interface IForgotEmailParams {
    email: string;
    captchaId: string;
    captchaVal: string;
}

interface IVerifyResetEmailTokenParams {
    token: string;
}

interface ResetEmailResponse {
    meta?: {};
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ForgotEmailResponse {
    meta?: {};
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface VerifyResetEmailTokenResponse {
    meta?: {};
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

@Route("/account/change-email")
@Tags("Account")
export class ResetEmailController extends Controller {
    @Post()
    @Example<ResetEmailResponse>({
        meta: {},
        data: {}
    })
    public async resetEmail(@Request() request: express.Request, @Body() body: IResetEmailParams): Promise<ResetEmailResponse> {
        return await licServerApiService.postClientRestoreEmail<ResetEmailResponse>({
            restoreEmailCode: body.restoreEmailCode,
            newEmail: body.email,
        }, request);
    }
}

@Route("/account/change-email")
@Tags("Account")
export class ForgotEmailController extends Controller {
    @Get()
    @Example<ForgotEmailResponse>({
        meta: {},
        data: {}
    })
    public async forgotEmail(@Request() request: express.Request, @Query() email: string,
        @Query() captchaId: string, @Query() captchaVal: string, @Query() language?: string): Promise<ForgotEmailResponse> {
        return await licServerApiService.getClientRestoreEmail<ForgotEmailResponse>({ email, captchaId, captchaVal, language }, request);
    }
}

@Route("/account/verify-change-email-token")
@Tags("Account")
export class VerifyResetEmailTokenController extends Controller {
    @Get()
    @Example<VerifyResetEmailTokenResponse>({
        meta: {},
        data: {}
    })
    public async verifyResetEmailToken(@Request() request: express.Request, @Query() restoreEmailCode: string): Promise<VerifyResetEmailTokenResponse> {
        return await licServerApiService.clientCheckRestoreEmailCode<VerifyResetEmailTokenResponse>({ restoreEmailCode }, request);
    }
}

@Route("/accounts")
@Tags("Account")
export class AccountsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<AccountsGetResponse>({
        meta: META_TEMPLATE,
        data: [ACCOUNT_RESPONSE_TEMPLATE],
    })
    public async getAccounts(@Request() request: IAuthRequest, @Query() all?: boolean, @Query() secure?: string): Promise<AccountsGetResponse> {
        return await licServerApiService.getAccounts(all, secure, request, { clientToken: request.token });
    }
}

@Route("/account")
@Tags("Account")
export class AccountController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
        data: ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async getAccount(id: string, @Request() request: IAuthRequest, @Query() secure?: string): Promise<AccountResponse> {
        return await licServerApiService.getAccount(id, secure, request, { clientToken: request.token });
    }

    @Post()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
        data: ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async createAccount(@Body() body: ICreateAccountParams, @Request() request: IAuthRequest,
        @Query() language?: string, @Query() secure?: string): Promise<AccountResponse> {
        return await licServerApiService.createAccount(body as any, language, secure, request, { clientToken: request.token });
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
        data: ACCOUNT_RESPONSE_TEMPLATE,
    })
    public async updateAccount(id: string, @Body() body: IUpdateAccountParams, @Request() request: IAuthRequest, @Query() secure?: string): Promise<AccountResponse> {
        return await licServerApiService.updateAccount(id, body, secure, request, { clientToken: request.token });
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<AccountResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteAccount(id: string, @Request() request: IAuthRequest, @Query() secure?: string): Promise<AccountResponse> {
        return await licServerApiService.deleteAccount(id, secure, request, { clientToken: request.token });
    }
}
