import * as express from "express";

export interface IAuthRequest extends express.Request {
    client: IAuthInfo;
}

export interface IAuthInfo {
    id: string;
    email: string;
}