import { IAuthRequest } from "src/interfaces"

export const getClientId = (request: IAuthRequest): string => {
    return request?.account?.owner || request?.account?.id;
};