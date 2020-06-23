import * as config from "../config";
import * as pug from "pug";
import { sendToEmail } from "../utils/sendToEmail";
import * as jwt from "jsonwebtoken";
import { UserModel, IUser, hashPassword, checkIfUnencryptedPasswordIsValid, RefTypes } from "../models/index";
import { Controller, Route, Post, Tags, Example, Body } from "tsoa";
import * as joi from "@hapi/joi";
import { riseRefVersion } from "../db/refs";
import { IRefItem } from "./RefsController";
import { getMaxListeners } from "process";

interface ISigninParams {
    email: string;
    password: string;
}

interface ISignupParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface IResetPasswordParams {
    token: string;
}

interface IForgotPasswordParams {
    email: string;
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

//function to validate user 
const validateSigninParams = (user: ISigninParams): joi.ValidationResult => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(3).max(255)/*.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))*/.required(),
    });

    return schema.validate(user);
};

const NAME_PATTERN = /^([\u00c0-\u01ffa-zA-Zа-яА-Я.'\-]+)$/;

// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)
// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

const validateSignupParams = (params: ISignupParams): joi.ValidationResult => {
    const schema = joi.object({
        firstName: joi.string().min(3).max(50).pattern(NAME_PATTERN).required(),
        lastName: joi.string().min(3).max(50).pattern(NAME_PATTERN).required(),
        email: joi.string().min(5).max(255).email().required(),
        password: joi.string().pattern(PASSWORD_PATTERN).required(),
        confirmPassword: joi.string().pattern(PASSWORD_PATTERN).required(),
    });

    return schema.validate(params);
};

const validateResetPasswordParams = (params: IResetPasswordParams): joi.ValidationResult => {
    const schema = joi.object({
        token: joi.string().required(),
    });

    return schema.validate(params);
};

const validateForgotPasswordParams = (params: IForgotPasswordParams): joi.ValidationResult => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).email().required(),
    });

    return schema.validate(params);
};

@Route("/auth/signup")
@Tags("Signup")
export class SignupController extends Controller {
    @Post()
    @Example<SignupResponse>({
        meta: {},
        data: {}
    })
    public async signup(@Body() requestBody: ISignupParams): Promise<SignupResponse> {
        const validation = validateSignupParams(requestBody);
        if (validation.error) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 1001,
                        message: validation.error.message,
                    }
                ]
            };
        }

        if (requestBody.password !== requestBody.confirmPassword) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 1002,
                        message: "Passwords are not equal.",
                    }
                ]
            };
        }

        const user = await UserModel.findOne({ email: requestBody.email });
        if (user) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 1003,
                        message: "Email is already in use.",
                    }
                ]
            };
        }

        let ref: IRefItem;

        try {
            const password = await hashPassword(requestBody.password);
            const newUser = new UserModel({
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                email: requestBody.email,
                password,
            });
            await newUser.save();
            ref = await riseRefVersion(RefTypes.USERS);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Internal server error. ${err}`,
                    }
                ]
            };
        }

        return {
            meta: { ref }
        };
    }
}

@Route("/auth/signin")
@Tags("Signin")
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
    public async signin(@Body() requestBody: ISigninParams): Promise<SigninResponse> {
        const validation = validateSigninParams(requestBody);
        if (validation.error) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 1001,
                        message: validation.error.message,
                    }
                ]
            };
        }

        let user: IUser;

        try {
            user = await UserModel.findOne({ email: requestBody.email });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: err,
                    }
                ]
            };
        }

        if (!user) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "User not found.",
                    }
                ]
            };
        }

        if (!checkIfUnencryptedPasswordIsValid(requestBody.password, user.password)) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "Incorrect password",
                    }
                ]
            };
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.AUTH_PRIVATE_KEY
        );
        return {
            data: {
                token,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        };
    }
}

@Route("/auth/reset-password")
@Tags("Reset password")
export class ResetPasswordController extends Controller {
    @Post()
    @Example<ResetPasswordResponse>({
        meta: {},
        data: {}
    })
    public async resetPassword(@Body() requestBody: IResetPasswordParams): Promise<ResetPasswordResponse> {
        const validation = validateResetPasswordParams(requestBody);
        if (validation.error) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: validation.error.message,
                    }
                ]
            };
        }

        let user: IUser;

        try {
            user = await UserModel.findOne({ resetPasswordToken: requestBody.token });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: err,
                    }
                ]
            };
        }

        if (!user) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "User not found.",
                    }
                ]
            };
        }

        const token = user.resetPasswordToken;
        if (!token) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "Link is not valid.",
                    }
                ]
            };
        }

        const resetPasswordExpires = user.resetPasswordExpires;
        if (resetPasswordExpires && resetPasswordExpires < Date.now()) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "Password reset link timed out.",
                    }
                ]
            };
        }

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        try {
            await user.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Internal server error. ${err}`,
                    }
                ]
            };
        }

        return {
            data: {}
        };
    }
}


@Route("/auth/forgot-password")
@Tags("Forgot password")
export class ForgotPasswordController extends Controller {
    @Post()
    @Example<ResetPasswordResponse>({
        meta: {},
        data: {}
    })
    public async forgotPassword(@Body() requestBody: IForgotPasswordParams): Promise<ResetPasswordResponse> {
        const validation = validateForgotPasswordParams(requestBody);
        if (validation.error) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: validation.error.message,
                    }
                ]
            };
        }

        let user: IUser;

        try {
            user = await UserModel.findOne({ email: requestBody.email });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: err,
                    }
                ]
            };
        }

        if (!user) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "User not found.",
                    }
                ]
            };
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, time: Date.now() },
            config.AUTH_FORGOT_PRIVATE_KEY
        );

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        try {
            await user.save();
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Internal server error. ${err}`,
                    }
                ]
            };
        }

        try {
            const htmlTempFunc = pug.compileFile(
                "src/templates/resetPasswordTemplate.pug"
            );

            sendToEmail({
                host: "smtp.jino.ru",
                port: 587,
                user: "tornado@eugene-grebennikov.pro",
                pass: "6372363723!",
                secure: false,
                from: "\"Eugene Grebennikov 👻\" <tornado@eugene-grebennikov.pro>",
                to: user.email,
                subject: "Hello ✔",
                text: "",
                html: htmlTempFunc(
                    {
                        token,
                        host: "localhost:4200",
                        helpEmail: "tornado@eugene-grebennikov.pro",
                    }
                ),
            });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Internal server error. ${err}`,
                    }
                ]
            };
        }

        return {
            data: {}
        };
    }
}
