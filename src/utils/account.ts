import { IAuthRequest } from "../interfaces"

export const getClientId = (request: IAuthRequest): string => {
    return request?.account?.owner || request?.account?.id;
};