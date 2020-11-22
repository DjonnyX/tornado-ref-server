import * as got from "got";
import { makeRequest } from "../utils/proxy";
import * as config from "../config";
import { ILicenseType } from "@djonnyx/tornado-types";

interface IRequestOptions {
    clientToken?: string;
}

class LicServerApiService {
    private getToken(options: IRequestOptions): string {
        const clientToken = !!options && !!options.clientToken ? options.clientToken: undefined;
        
        if (!!clientToken) {
            return `Bearer ${options.clientToken}`;
        }
        
        return config.AUTH_LIC_SERVER_API_KEY;
    }

    public async getClients<T = any>(options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/clients`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async getClient<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/clients/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async verifyLicenseKey<T = any>(key: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/verify-lic-key/${key}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    // license types
    public async getLicenseTypes<T = any>(options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-types`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async getLicenseType<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async createLicenseType<T = any>(id: string, licenseType: ILicenseType, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(licenseType),
            }),
        );
    }

    public async updateLicenseType<T = any>(id: string, licenseType: ILicenseType, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(licenseType),
            }),
        );
    }

    public async deleteLicenseType<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
            }),
        );
    }
}

export const licServerApiService = new LicServerApiService();