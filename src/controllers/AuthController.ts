import { Controller, Route, Post, Tags, Example, Request, Body, Get, Query } from "tsoa";
import * as express from "express";
import { licServerApiService } from "../services";
import { DefaultRoleTypes, IAccountInfo, UserRights } from "@djonnyx/tornado-types";
import { IAuthRequest } from "../interfaces";
import { ACCOUNT_RESPONSE_TEMPLATE } from "./AccountController";
import { initDB } from "../db/initDB";

export interface ISigninParams {
    email: string;
    password: string;
}

export interface ISignupParams {
    captchaId: string;
    captchaValue?: string;
    integrationId?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    extra?: {
        [key: string]: any;
    } | null;
}

export interface IResetPasswordParams {
    restorePassCode: string;
    password: string;
}

export interface IForgotPasswordParams {
    email: string;
    captchaId: string;
    captchaVal: string;
}

export interface IVerifyResetPasswordTokenParams {
    token: string;
}

interface SigninResponse {
    meta?: {};
    data?: {
        account: IAccountInfo,
        token: string;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface SignoutResponse {
    meta?: {};
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface GetSignupResponse {
    meta?: {};
    data?: {
        captcha: {
            id: string;
            svg: string;
        };
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface GetCaptchaResponse {
    meta?: {};
    data?: {
        id: string;
        svg: string;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface SignupResponse {
    meta?: {};
    data?: {
        client: string;
        owner: string;
    };
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ResetPasswordResponse {
    meta?: {};
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ForgotPasswordResponse {
    meta?: {};
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface VerifyResetPasswordTokenResponse {
    meta?: {};
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

@Route("/auth/captcha")
@Tags("Auth")
export class CaptchaController extends Controller {
    @Get()
    @Example<GetCaptchaResponse>({
        meta: {},
        data: {
            id: "123123-234234-234234",
            svg: "<svg></svg>",
        }
    })
    public async getCaptcha(@Request() request: express.Request): Promise<GetCaptchaResponse> {
        return await licServerApiService.getCaptcha(request);
    }
}

@Route("/auth/signup")
@Tags("Auth")
export class SignupController extends Controller {
    @Post()
    @Example<SignupResponse>({
        meta: {},
        data: {
            client: "123456",
            owner: "123456",
        }
    })
    public async signup(@Body() body: ISignupParams, @Request() request: IAuthRequest, @Query() language?: string): Promise<SignupResponse> {
        let res: SignupResponse;

        try {
            res = await licServerApiService.signup<SignupResponse>(body, language, request, {
                clientToken: request.token,
            });

            // Инициализация БД под клиента
            await initDB(res.data.client);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: err.message,
                    }
                ]
            };
        }

        return res;
    }
}

@Route("/auth/signin")
@Tags("Auth")
export class SigninController extends Controller {
    @Post()
    @Example<SigninResponse>({
        meta: {},
        data: {
            account: ACCOUNT_RESPONSE_TEMPLATE,
            token: "507c7f79bcf86cd7994f6c0e",
        }
    })
    public async signin(@Request() request: express.Request, @Body() body: ISigninParams): Promise<SigninResponse> {
        let res: SigninResponse;

        try {
            res = await licServerApiService.signin<SigninResponse>({
                pass: body.password,
                email: body.email,
            });
        } catch (err) {
            this.setStatus(401);
            return {
                error: [
                    {
                        code: 401,
                        message: err.message,
                    }
                ]
            };
        }

        if (res?.data?.account?.roleType === DefaultRoleTypes.OWNER) {
            try {
                // Инициализация БД под клиента
                await initDB(res.data.account.id);
            } catch (err) { }
        }

        return res;
    }
}

@Route("/auth/reset-password")
@Tags("Auth")
export class ResetPasswordController extends Controller {
    @Post()
    @Example<ResetPasswordResponse>({
        meta: {},
        data: {}
    })
    public async resetPassword(@Request() request: express.Request, @Body() body: IResetPasswordParams): Promise<ResetPasswordResponse> {
        return await licServerApiService.postClientRestorePassword<ResetPasswordResponse>({
            restorePassCode: body.restorePassCode,
            newPass: body.password,
        }, request);
    }
}

@Route("/auth/forgot-password")
@Tags("Auth")
export class ForgotPasswordController extends Controller {
    @Get()
    @Example<ForgotPasswordResponse>({
        meta: {},
        data: {}
    })
    public async forgotPassword(@Request() request: express.Request, @Query() email: string,
        @Query() captchaId: string, @Query() captchaVal: string, @Query() language?: string): Promise<ForgotPasswordResponse> {
        return await licServerApiService.getClientRestorePassword<ForgotPasswordResponse>({ email, captchaId, captchaVal, language }, request);
    }
}

@Route("/auth/verify-reset-password-token")
@Tags("Auth")
export class VerifyResetPasswordTokenController extends Controller {
    @Get()
    @Example<VerifyResetPasswordTokenResponse>({
        meta: {},
        data: {}
    })
    public async verifyResetPasswordToken(@Request() request: express.Request, @Query() restorePassCode: string): Promise<VerifyResetPasswordTokenResponse> {
        return await licServerApiService.clientCheckRestorePassCode<VerifyResetPasswordTokenResponse>({ restorePassCode }, request);
    }
}