import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { TerminalConfig, TerminalStatusTypes, TerminalTypes } from "@djonnyx/tornado-types";

interface ITerminalDocument extends Document {
    clientId: string;
    status: TerminalStatusTypes;
    type: TerminalTypes;
    name: string;
    storeId: string;
    lastwork: Date;
    imei: string;
    licenseId: string;
    config: TerminalConfig;
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
        type: TerminalTypes,
        enum: [
            TerminalTypes.KIOSK,
            TerminalTypes.ORDER_PICKER,
            TerminalTypes.EQUEUE,
            TerminalTypes.EQUEUE_CONTROLLER,
            TerminalTypes.EMENU,
            TerminalTypes.GUEST_SCREEN,
            TerminalTypes.MENU_BOARD,
            TerminalTypes.CASHBOX,
            TerminalTypes.CASH_INTERFACE,
        ]
    },
    name: { type: String },
    storeId: { type: String },
    lastwork: { type: Date },
    imei: { type: String, unique: true, required: true },
    licenseId: { type: String, unique: true, required: true },
    config: {
        type: Schema.Types.Mixed,
        required: true,
    },
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const TerminalModel = mongoose.model<ITerminalDocument>("Terminal", TerminalSchema);

export { TerminalModel, ITerminalDocument };
