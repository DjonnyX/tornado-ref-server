import { TerminalStatusTypes, TerminalTypes } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ITerminalDocument extends Document {
    client: string;
    status: TerminalStatusTypes;
    type: TerminalTypes;
    name: string;
    store: string;
    lastwork: Date;
    extra?: { [key: string]: any } | null;
}

const TerminalSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
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
    name: { type: String, required: true },
    store: { type: Schema.Types.ObjectId },
    lastwork: { type: Date },
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const TerminalModel = mongoose.model<ITerminalDocument>("Terminal", TerminalSchema);

export { TerminalModel, ITerminalDocument };
