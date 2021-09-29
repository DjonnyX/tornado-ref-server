import * as express from "express";
import { ILicense, TerminalTypes } from "@djonnyx/tornado-types";

export interface IAuthRequest extends express.Request {
    account?: IAccountAuthInfo;
    terminal?: ITerminalAuthInfo;
    integration?: IIntegrationAuthInfo;
    token?: string;
}

export interface IAccountAuthInfo {
    id: string;
    owner: string;
}

export interface IIntegrationAuthInfo {
    integrationId: string;
    serverName: string;
}

export interface ITerminalAuthInfo {
    imei: string;
    key: string;
    type: TerminalTypes;
    license: ILicense;
}