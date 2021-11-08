import * as got from "got";
import { makeRequest } from "../utils/proxy";
import * as config from "../config";
import { ILicense, IApplication, ITarif, IIntegration } from "@djonnyx/tornado-types";
import { ISignupParams } from "../controllers/AuthController";
import { IAuthRequest } from "src/interfaces";
import { ICreateSubscriptionParams, IUpdateSubscriptionParams } from "../controllers/SubscriptionController";
import { ICreateLicenseParams, IUpdateLicenseParams } from "../controllers/LicenseController";

interface IRequestOptions {
    clientToken?: string;
    query?: Object;
}

interface ILoginParams {
    pass: string;
    email: string;
}

interface IGetClientCheckRestorePasswordParams {
    restorePassCode: string;
}

interface IPostClientRestorePasswordParams {
    restorePassCode: string;
    newPass: string;
}

interface IGetClientRestorePasswordParams {
    email: string;
    captchaId: string;
    captchaVal: string;
    language: string;
}

interface IGetClientCheckRestoreEmailParams {
    restoreEmailCode: string;
}

interface IPostClientRestoreEmailParams {
    restoreEmailCode: string;
    newEmail: string;
}

interface IGetClientRestoreEmailParams {
    email: string;
    captchaId: string;
    captchaVal: string;
    language: string;
}

export interface ICheckLicenseResponse {
    meta?: any;
    data?: ILicense;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

export interface ISetDeviceResponse {
    meta?: any;
    data?: ILicense;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

const BASE_URL = "api/v0/";

class LicServerApiService {
    private getToken(options?: IRequestOptions): string {
        const clientToken = !!options && !!options.clientToken ? options.clientToken : undefined;

        if (!!clientToken) {
            return `Bearer ${options.clientToken}`;
        }

        return `Bearer ${config.AUTH_LIC_SERVER_API_KEY}`;
    }

    public async getCaptcha<T = any>(request: IAuthRequest): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}captcha`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                },
                query: request.query,
            }),
        );
    }

    public async signin<T = any>(params: ILoginParams, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}clientToken`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(params),
            }),
        );
    }

    public async signup<T = any>(params: ISignupParams, language: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}auth/registration`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    language,
                },
                body: JSON.stringify(params),
            }),
        );
    }

    public async postClientRestoreEmail<T = any>(params: IPostClientRestoreEmailParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}account/restoreEmail`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(params),
            }),
        );
    }

    public async getClientRestoreEmail<T = any>(params: IGetClientRestoreEmailParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}account/restoreEmail`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    ...params,
                },
            }),
        );
    }

    public async clientCheckRestoreEmailCode<T = any>(params: IGetClientCheckRestoreEmailParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}account/checkRestoreEmailCode`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    ...params
                },
            }),
        );
    }

    public async postClientRestorePassword<T = any>(params: IPostClientRestorePasswordParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}client/restorePass`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(params),
            }),
        );
    }

    public async getClientRestorePassword<T = any>(params: IGetClientRestorePasswordParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}client/restorePass`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    ...params,
                },
            }),
        );
    }

    public async clientCheckRestorePassCode<T = any>(params: IGetClientCheckRestorePasswordParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}client/checkRestorePassCode`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    ...params,
                },
            }),
        );
    }

    public async getAccounts<T = any>(all: boolean, secure: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}clients`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    all: all ? String(Boolean(all)) : undefined,
                    secure: secure ? String(Boolean(secure)) : undefined,
                },
            }),
        );
    }

    public async getAccount<T = any>(id: string, secure: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}clients/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    secure: secure ? String(Boolean(secure)) : undefined,
                },
            }),
        );
    }

    public async createAccount<T = any>(body: any, language: string, secure: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}clients`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    secure: secure ? String(Boolean(secure)) : undefined,
                    language,
                },
                body: JSON.stringify(body),
            }),
        );
    }

    public async updateAccount<T = any>(id: string, body: any, secure: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}clients/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    secure: secure ? String(Boolean(secure)) : undefined,
                },
                body: JSON.stringify(body),
            }),
        );
    }

    public async deleteAccount<T = any>(id: string, secure: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/${BASE_URL}clients/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    ...request.query,
                    secure: secure ? String(Boolean(secure)) : undefined,
                },
            }),
        );
    }

    public async setDevice(deviceToken: string, request: IAuthRequest): Promise<ISetDeviceResponse> {
        return await makeRequest(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}license/setDevice`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken({
                        clientToken: deviceToken,
                    }),
                },
                query: request.query,
            }),
        );
    }

    public async checkLicense(deviceToken: string, request: IAuthRequest): Promise<ICheckLicenseResponse> {
        return await makeRequest(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}deviceToken/check`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken({
                        clientToken: deviceToken,
                    }),
                },
                query: request.query,
            }),
        );
    }

    // roles
    public async getRoles<T = any>(request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}roles`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async getRole<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}role/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async createRole<T = any>(body: any, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}role`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(body),
            }),
        );
    }

    public async updateRole<T = any>(id: string, body: any, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}role/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(body),
            }),
        );
    }

    public async deleteRole<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/${BASE_URL}role/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    // licenses
    public async getLicenses<T = any>(request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}license/scope`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async getLicense<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}license/scope/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async createLicense<T = any>(license: ICreateLicenseParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}license/scope/`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(license),
            }),
        );
    }

    public async updateLicense<T = any>(id: string, license: IUpdateLicenseParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}license/scope/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(license),
            }),
        );
    }

    public async unbindLicense<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}license/scope/unbind/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async deleteLicense<T = any>(id: String, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/${BASE_URL}license/scope/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async getLicensesForClient<T = any>(request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}license/forClient`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async getLicenseForClient<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}license/forClient/byId`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: {
                    id,
                    ...request.query,
                }
            }),
        );
    }

    // applications
    public async getApplications<T = any>(request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}applications`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async getApplication<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}application/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async createApplication<T = any>(application: IApplication, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}application`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(application),
            }),
        );
    }

    public async updateApplication<T = any>(id: string, application: IApplication, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}application/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(application),
            }),
        );
    }

    public async deleteApplication<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/${BASE_URL}application/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    // subscriptions
    public async getSubscriptions<T = any>(request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}subscriptions`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }
    
    public async getSubscriptionsByClient<T = any>(request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}subscriptions/forClient`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async getSubscription<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}subscriptions/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async createSubscription<T = any>(subscription: ICreateSubscriptionParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}subscriptions`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(subscription),
            }),
        );
    }
    
    public async activateNextPeriodSubscription<T = any>(id: string, subscription: IUpdateSubscriptionParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}subscriptions/activateNextPeriod/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(subscription),
            }),
        );
    }

    public async updateSubscription<T = any>(id: string, subscription: IUpdateSubscriptionParams, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}subscriptions/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(subscription),
            }),
        );
    }

    public async deleteSubscription<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/${BASE_URL}subscriptions/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    // tarifs
    public async getTarifs<T = any>(request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}tarifs`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async getTarif<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}tarif/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async createTarif<T = any>(tarif: ITarif, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}tarif`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(tarif),
            }),
        );
    }

    public async updateTarif<T = any>(id: string, tarif: ITarif, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}tarif/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(tarif),
            }),
        );
    }

    public async deleteTarif<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/${BASE_URL}tarif/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    // integrations
    public async getIntegrations<T = any>(request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}integrations`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }

    public async getIntegrationServerInfo<T = any>(data: { host: string }, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}integration/server-info`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(data),
            }),
        );
    }

    public async getIntegration<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/${BASE_URL}integration/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: { ...request.query, ...(options?.query || {}) },
            }),
        );
    }

    public async createIntegration<T = any>(integration: IIntegration, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/${BASE_URL}integration`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(integration),
            }),
        );
    }

    public async updateIntegration<T = any>(id: string, integration: IIntegration, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/${BASE_URL}integration/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
                body: JSON.stringify(integration),
            }),
        );
    }

    public async deleteIntegration<T = any>(id: string, request: IAuthRequest, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/${BASE_URL}integration/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                query: request.query,
            }),
        );
    }
}

export const licServerApiService = new LicServerApiService();