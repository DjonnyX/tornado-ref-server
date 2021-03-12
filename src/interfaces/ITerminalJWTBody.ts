import { TerminalTypes } from "@djonnyx/tornado-types";

export interface ITerminalJWTBody {
    type: TerminalTypes;
    imei: string;
    hash: string;
}