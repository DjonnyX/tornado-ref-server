import { Controller, Route, Post, Tags, Example, Header, Request, Body, Get } from "tsoa";
import * as got from "got";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as config from "../config";
import { initRefs } from "../db/initDB";
import { IJWTBody } from "../interfaces";

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
        token: string;
        firstName: string;
        lastName: string;
        email: string;
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

async function createProxyRequestToAuthServer<R = any>(context: Controller, request: express.Request): Promise<R> {
    let r: got.Response<any>;
    const headers = {
        "content-type": "application/json",
    };

    try {
        r = await (request.method === "POST"
            ?
            got.post(`${config.LIC_SERVER_HOST}${request.originalUrl}`, {
                headers,
                body: JSON.stringify(request.body),
            })
            :
            got.get(`${config.LIC_SERVER_HOST}${request.originalUrl}`, {
                headers,
            })
        );
    } catch (err) {
        context.setStatus(500);

        if (err instanceof got.HTTPError && err.statusCode === 500) {
            let authServerResp: any;
            try {
                authServerResp = JSON.parse(err.body as string);
            } catch (err1) {
                return {
                    error: [
                        {
                            code: 500,
                            message: `Proxy request to the auth server fail. Error: ${err1}`,
                        }
                    ]
                } as any;
            }
            return authServerResp;
        }
        return {
            error: [
                {
                    code: 500,
                    message: `Proxy request to the auth server fail. Error: ${err}`,
                }
            ]
        } as any;
    }

    let body: any;
    try {
        body = JSON.parse(r.body)
    } catch (err) {
        return {
            error: [
                {
                    code: 500,
                    message: `Response body from auth server bad format. Error: ${err}`,
                }
            ]
        } as any;
    }
    return body;
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
            token: "507c7f79bcf86cd7994f6c0e",
            firstName: "First name",
            lastName: "Last name",
            email: "test@test.com",
        }
    })
    public async signin(@Request() request: express.Request, @Body() body: ISigninParams): Promise<SigninResponse> {
        const res = await createProxyRequestToAuthServer<SigninResponse>(this, request);

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
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Token is not valid. ${err}`,
                    }
                ]
            };
        }

        // Инициализация БД под клиента
        await initRefs(authInfo.userId);

        return res;
    }
}

@Route("/auth/signout")
@Tags("Auth")
export class SignoutController extends Controller {
    @Post()
    @Example<SignoutResponse>({
        meta: {},
        data: {}
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async signout(@Header("authorization") token: string): Promise<SignoutResponse> {

        // позже нужно будет доделать
        // + сессии сделать

        return {
            data: {}
        };
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