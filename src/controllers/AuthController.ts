import { Controller, Route, Post, Tags, Example, Header, Request } from "tsoa";
import * as got from "got";
import * as express from "express";

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

interface SignupResponse {
    meta?: {};
    data?: {};
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

async function createProxyRequestToAuthServer<R = any>(request: express.Request): Promise<R> {
    let response: R;
    try {
        response = await got.post(request.originalUrl, {
            headers: request.headers,
            body: request.body,
        }) as any;
    } catch (err) {
        this.setStatus(500);
        return {
            error: [
                {
                    code: 500,
                    message: "Auth server is not available",
                }
            ]
        } as any;
    }
    return response;
}

@Route("/auth/signup")
@Tags("Auth")
export class SignupController extends Controller {
    @Post()
    @Example<SignupResponse>({
        meta: {},
        data: {}
    })
    public async signup(@Request() request: express.Request): Promise<SignupResponse> {
        return await createProxyRequestToAuthServer<SignupResponse>(request);
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
    public async signin(@Request() request: express.Request): Promise<SigninResponse> {
        return await createProxyRequestToAuthServer<SigninResponse>(request);
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
    public async resetPassword(@Request() request: express.Request): Promise<ResetPasswordResponse> {
        return await createProxyRequestToAuthServer<ResetPasswordResponse>(request);
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
    public async forgotPassword(@Request() request: express.Request): Promise<ForgotPasswordResponse> {
        return await createProxyRequestToAuthServer<ForgotPasswordResponse>(request);
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
    public async verifyResetPasswordToken(@Request() request: express.Request): Promise<VerifyResetPasswordTokenResponse> {
        return await createProxyRequestToAuthServer<VerifyResetPasswordTokenResponse>(request);
    }
}