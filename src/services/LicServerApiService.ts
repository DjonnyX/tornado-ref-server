import * as got from "got";
import { makeRequest } from "../utils/proxy";
import * as config from "../config";
import { ILicense, ILicenseType, IApplication, IIntegration } from "@djonnyx/tornado-types";

interface IRequestOptions {
    clientToken?: string;
}

interface IGetClientTokenParams {
    pass: string;
    email: string;
}

class LicServerApiService {
    private getToken(options: IRequestOptions): string {
        const clientToken = !!options && !!options.clientToken ? options.clientToken: undefined;
        
        if (!!clientToken) {
            return `Bearer ${options.clientToken}`;
        }
        
        return `Bearer ${config.AUTH_LIC_SERVER_API_KEY}`;
    }

    public async getClientToken<T = any>(params: IGetClientTokenParams, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/api/v1/clientToken`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(params),
            }),
        );
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

    // licenses
    public async getLicenses<T = any>(options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/licenses`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async getLicense<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async createLicense<T = any>(license: ILicense, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(license),
            }),
        );
    }

    public async updateLicense<T = any>(id: string, license: ILicense, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(license),
            }),
        );
    }

    public async deleteLicense<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
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

    public async createLicenseType<T = any>(licenseType: ILicenseType, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/license-type`, {
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

    // applications
    public async getApplications<T = any>(options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/applications`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async getApplication<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/application/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async createApplication<T = any>(licenseType: IApplication, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/api/v1/application`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(licenseType),
            }),
        );
    }

    public async updateApplication<T = any>(id: string, licenseType: IApplication, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/api/v1/application/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(licenseType),
            }),
        );
    }

    public async deleteApplication<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/api/v1/application/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
            }),
        );
    }

    // integrations
    public async getIntegrations<T = any>(options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/integrations`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async getIntegration<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/integration/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                }
            }),
        );
    }

    public async createIntegration<T = any>(licenseType: IIntegration, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.post(`${config.LIC_SERVER_HOST}/api/v1/integration`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(licenseType),
            }),
        );
    }

    public async updateIntegration<T = any>(id: string, licenseType: IIntegration, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.put(`${config.LIC_SERVER_HOST}/api/v1/integration/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
                body: JSON.stringify(licenseType),
            }),
        );
    }

    public async deleteIntegration<T = any>(id: string, options?: IRequestOptions): Promise<T> {
        return await makeRequest<T>(
            got.delete(`${config.LIC_SERVER_HOST}/api/v1/integration/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": this.getToken(options),
                },
            }),
        );
    }
}

export const licServerApiService = new LicServerApiService();