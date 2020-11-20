import * as got from "got";
import { makeRequest } from "../utils/proxy";
import * as config from "../config";

class LicServerApiService {
    public async getClients(): Promise<any> {
        await makeRequest(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/clients`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${config.AUTH_LIC_SERVER_API_KEY}`,
                }
            }),
        );
    }

    public async getClient(id: string): Promise<any> {
        await makeRequest(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/clients/${id}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${config.AUTH_LIC_SERVER_API_KEY}`,
                }
            }),
        );
    }

    public async verifyLicenseKey(key: string): Promise<any> {
        await makeRequest(
            got.get(`${config.LIC_SERVER_HOST}/api/v1/verify-lic-key/${key}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${config.AUTH_LIC_SERVER_API_KEY}`,
                }
            }),
        );
    }
}

export const licServerApiService = new LicServerApiService();