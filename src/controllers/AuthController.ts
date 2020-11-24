import { Controller, Route, Post, Tags, Example, Request, Body, Get } from "tsoa";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as config from "../config";
import { initRefs } from "../db/initDB";
import { IJWTBody } from "../interfaces";
import { createProxyRequestToAuthServer } from "../utils/proxy";
import { licServerApiService } from "../services";

interface ISigninParams {
    email: string;
    password: string;
}

interface ISignupParams {
    captchaId: string;
    captchaValue: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IResetPasswordParams {
    token: string;
    password: string;
}

interface IForgotPasswordParams {
    email: string;
}

interface IVerifyResetPasswordTokenParams {
    token: string;
}

interface SigninResponse {
    meta?: {};
    data?: {
        account: {
            email: string;
            lastName: string;
            patronymicName: string;
            phone: string;
            position: string;
            name: string;
            language: string;
        },
        token: string;
        rights: Array<{
            obj: string;
            action: string;
        }>;
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

interface SignupResponse {
    meta?: {};
    data?: {
        clientId: string;
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

@Route("/auth/signup")
@Tags("Auth")
export class SignupController extends Controller {
    @Get()
    @Example<GetSignupResponse>({
        meta: {},
        data: {
            captcha: {
                id: "123123-234234-234234",
                svg: "<svg></svg>",
            },
        }
    })
    public async getSignupParams(@Request() request: express.Request): Promise<GetSignupResponse> {
        return await createProxyRequestToAuthServer<GetSignupResponse>(this, request);
    }

    @Post()
    @Example<SignupResponse>({
        meta: {},
        data: {
            clientId: "123456",
        }
    })
    public async signup(@Request() request: express.Request, @Body() body: ISignupParams): Promise<SignupResponse> {
        return await createProxyRequestToAuthServer<SignupResponse>(this, request);
    }
}

@Route("/auth/signin")
@Tags("Auth")
export class SigninController extends Controller {
    @Post()
    @Example<SigninResponse>({
        meta: {},
        data: {
            account: {
                email: "test@test.com",
                lastName: "Last name",
                patronymicName: "Patronymic name",
                phone: "+79999999999",
                position: "1",
                name: "First name",
                language: "RU"
            },
            token: "507c7f79bcf86cd7994f6c0e",
            rights: [
                {
                    obj: "terminals",
                    action: "ALLOW"
                }
            ]
        }
    })
    public async signin(@Request() request: express.Request, @Body() body: ISigninParams): Promise<SigninResponse> {
        let res: SigninResponse;

        try {
            res = await licServerApiService.getClientToken<SigninResponse>({
                pass: body.password,
                email: body.email,
            });
        } catch (err) {
            this.setStatus(401);
            return {
                error: [
                    {
                        code: 401,
                        message: `Bad request ("signin"). ${err}`,
                    }
                ]
            };
        }

        // Потом это убрать
        let authInfo: IJWTBody;
        try {
            authInfo = await new Promise((resolve, reject) => {
                jwt.verify(res.data.token, config.AUTH_CLIENT_PRIVATE_KEY, function (err: any, decoded: IJWTBody) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            })
        } catch (err) {
            this.setStatus(401);
            return {
                error: [
                    {
                        code: 401,
                        message: `Unauthorized.`,
                    }
                ]
            };
        }

        // А тут заменить на res.meta.client.id (или подобное)
        // Инициализация БД под клиента
        await initRefs(authInfo.userId);

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
        return await createProxyRequestToAuthServer<ResetPasswordResponse>(this, request);
    }
}

@Route("/auth/forgot-password")
@Tags("Auth")
export class ForgotPasswordController extends Controller {
    @Post()
    @Example<ForgotPasswordResponse>({
        meta: {},
        data: {}
    })
    public async forgotPassword(@Request() request: express.Request, @Body() body: IForgotPasswordParams): Promise<ForgotPasswordResponse> {
        return await createProxyRequestToAuthServer<ForgotPasswordResponse>(this, request);
    }
}

@Route("/auth/verify-reset-password-token")
@Tags("Auth")
export class VerifyResetPasswordTokenController extends Controller {
    @Post()
    @Example<VerifyResetPasswordTokenResponse>({
        meta: {},
        data: {}
    })
    public async verifyResetPasswordToken(@Request() request: express.Request, @Body() body: IVerifyResetPasswordTokenParams): Promise<VerifyResetPasswordTokenResponse> {
        return await createProxyRequestToAuthServer<VerifyResetPasswordTokenResponse>(this, request);
    }
}