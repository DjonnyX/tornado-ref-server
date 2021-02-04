import { TerminalStatusTypes, TerminalTypes } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ITerminalDocument extends Document {
    clientId: string;
    status: TerminalStatusTypes;
    type: TerminalTypes;
    name: string;
    storeId: string;
    lastwork: Date;
    imei: string;
    licenseId: string;
    extra?: { [key: string]: any } | null;
}

const TerminalSchema = new Schema({
    clientId: { type: String, required: true, index: { unique: false } },
    status: {
        type: String,
        enum: [
            TerminalStatusTypes.ONLINE,
            TerminalStatusTypes.UNAVAILABLE,
        ]
    },
    type: {
        type: String,
        enum: [
            TerminalTypes.KIOSK,
            TerminalTypes.CASHBOX,
            TerminalTypes.EQUEUE,
            TerminalTypes.EMENU,
            TerminalTypes.GUEST_SCREEN,
            TerminalTypes.MENU_BOARD,
            TerminalTypes.COLLECTOR,
        ]
    },
    name: { type: String },
    storeId: { type: String },
    lastwork: { type: Date },
    imei: { type: String, unique: true, required: true },
    licenseId: { type: String, unique: true, required: true },
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const TerminalModel = mongoose.model<ITerminalDocument>("Terminal", TerminalSchema);

export { TerminalModel, ITerminalDocument };
