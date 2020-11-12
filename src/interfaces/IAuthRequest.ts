import * as express from "express";

export interface IAuthRequest extends express.Request {
    client: IAuthInfo;
}

interface IAuthInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}