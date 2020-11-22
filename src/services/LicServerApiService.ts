import * as got from "got";
import { makeRequest } from "../utils/proxy";
import * as config from "../config";
import { ILicenseType } from "@djonnyx/tornado-types";

class LicServerApiService {
    private getToken(): string {
        return `Bearer ${config.AUTH_LIC_SERVER_API_KEY}`;
    }

    public async getClients<T = any>(): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/clients`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                }
            }),
        );
    }

    public async getClient<T = any>(id: string): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/clients/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                }
            }),
        );
    }

    public async verifyLicenseKey<T = any>(key: string): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/verify-lic-key/${key}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                }
            }),
        );
    }

    // license types
    public async getLicenseTypes<T = any>(): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-types`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                }
            }),
        );
    }

    public async getLicenseType<T = any>(id: string): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                }
            }),
        );
    }

    public async createLicenseType<T = any>(id: string, licenseType: ILicenseType): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                },
                body: JSON.stringify(licenseType),
            }),
        );
    }

    public async updateLicenseType<T = any>(id: string, licenseType: ILicenseType): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                },
                body: JSON.stringify(licenseType),
            }),
        );
    }

    public async deleteLicenseType<T = any>(id: string): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(),
                },
            }),
        );
    }
}

export const licServerApiService = new LicServerApiService();