export interface IIntegrationJWTBody {
    integrationId: string;
    serverName: string;
    iat: number;
    exp: number;
}