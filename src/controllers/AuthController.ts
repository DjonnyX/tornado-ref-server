import * as config from "../config";
import * as jwt from "jsonwebtoken";
import { UserModel, IUser, hashPassword, checkIfUnencryptedPasswordIsValid } from "../models/index";
import { Controller, Route, Post, Tags, Example, Body } from "tsoa";
import * as joi from "@hapi/joi";

export type ErrorResponse = Array<{
    code: number;
    message: string;
}>;

interface ILoginParams {
    email: string;
    password: string;
}

interface IRegistrationParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SigninResponse {
    meta?: {};
    data?: {
        token: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    error?: ErrorResponse;
}

interface SignupResponse {
    meta?: {};
    data?: {};
    error?: ErrorResponse;
}

//function to validate user 
const validateLoginParams = (user: ILoginParams): joi.ValidationResult => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(3).max(255)/*.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))*/.required(),
    });

    return schema.validate(user);
};

const validateRegistrationParams = (params: IRegistrationParams): joi.ValidationResult => {
    const schema = joi.object({
        firstName: joi.string().min(3).max(50).required(),
        lastName: joi.string().min(3).max(50).required(),
        email: joi.string().min(5).max(255).email().required(),
        // At least one upper case English letter, (?=.*?[A-Z])
        // At least one lower case English letter, (?=.*?[a-z])
        // At least one digit, (?=.*?[0-9])
        // At least one special character, (?=.*?[#?!@$%^&*-])
        // Minimum eight in length .{8,} (with the anchors)
        // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
        password: joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")).required(),
        confirmPassword: joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")).required(),
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
    public async registration(@Body() requestBody: IRegistrationParams): Promise<SignupResponse> {
        const validation = validateRegistrationParams(requestBody);
        if (validation.error) {
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
            return {
                error: [
                    {
                        code: 1003,
                        message: "Email is already in use.",
                    }
                ]
            };
        }

        try {
            const password = await hashPassword(requestBody.password);
            const newUser = new UserModel({
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                email: requestBody.email,
                password,
            });
            await newUser.save();
        } catch (err) {
            return {
                error: [
                    {
                        code: 500,
                        message: `Internal server error. ${err}`,
                    }
                ]
            };
        }

        return {};
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
    public async login(@Body() requestBody: ILoginParams): Promise<SigninResponse> {
        const validation = validateLoginParams(requestBody);
        if (validation.error) {
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
