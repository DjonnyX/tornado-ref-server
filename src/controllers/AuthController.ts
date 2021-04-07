import { Controller, Route, Post, Tags, Example, Request, Body, Get, Query } from "tsoa";
import * as express from "express";
import { initRefs } from "../db/initDB";
import { licServerApiService } from "../services";
import { UserRights } from "@djonnyx/tornado-types";

interface ISigninParams {
    email: string;
    password: string;
}

interface ISignupParams {
    captchaId: string;
    captchaValue: string;
    integrationId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IResetPasswordParams {
    restorePassCode: string;
    password: string;
}

interface IForgotPasswordParams {
    email: string;
    captchaId: string;
    captchaVal: string;
}

interface IVerifyResetPasswordTokenParams {
    token: string;
}

interface SigninResponse {
    meta?: {};
    data?: {
        account: {
            id: string;
            firstName: string;
            lastName: string;
            integrationId: string;
            email: string;
            rights: Array<UserRights>,
        },
        token: string;
        role: string;
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
        return await licServerApiService.getCaptcha();
    }
}

@Route("/auth/signup")
@Tags("Auth")
export class SignupController extends Controller {
    @Post()
    @Example<SignupResponse>({
        meta: {},
        data: {
            clientId: "123456",
        }
    })
    public async signup(@Body() body: ISignupParams): Promise<SignupResponse> {
        let res: SignupResponse;

        try {
            res = await licServerApiService.signup<SignupResponse>(body);

            // Инициализация БД под клиента
            await initRefs(res.data.clientId);
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
            account: {
                id: "507c7f79bcf86cd7994f6c0e",
                firstName: "First name",
                lastName: "Last name",
                integrationId: "507c7f79bcf86cd7994f6c0e",
                email: "test@test.com",
                rights: [
                    UserRights.CREATE_CURRENCY,
                    UserRights.CREATE_PRODUCT,
                ]
            },
            token: "507c7f79bcf86cd7994f6c0e",
            role: "user",
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

        if (res?.data?.role === "admin") {
            return res;
        }

        try {
            // Инициализация БД под клиента
            await initRefs(res.data.account.id);
        } catch (err) { }

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
        });
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
    public async forgotPassword(@Request() request: express.Request, @Query() email: string, @Query() captchaId: string, @Query() captchaVal): Promise<ForgotPasswordResponse> {
        return await licServerApiService.getClientRestorePassword<ForgotPasswordResponse>({ email, captchaId, captchaVal });
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
        return await licServerApiService.clientCheckRestorePassCode<VerifyResetPasswordTokenResponse>({ restorePassCode });
    }
}