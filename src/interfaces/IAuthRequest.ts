import * as express from "express";
import { ILicense } from "@djonnyx/tornado-types";

export interface IAuthRequest extends express.Request {
    client?: IAuthInfo;
    terminal?: ITerminalAuthInfo;
    token?: string;
}

export interface IAuthInfo {
    id: string;
}

export interface ITerminalAuthInfo {
    imei: string;
    key: string;
    license: ILicense;
}