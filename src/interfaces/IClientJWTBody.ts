export interface IClientJWTBody {
    id: string;
    email: string;
    iat: number;
    exp: number;
}