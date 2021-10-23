import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { IAsset, TerminalTypes } from "@djonnyx/tornado-types";

interface IAppThemeDocument extends Document {
    isDefault: boolean;
    client: string;
    type: TerminalTypes;
    name: string;
    version: number;
    lastUpdate: Date;
    assets: Array<string>;
    resources: { [name: string]: string };
    data: any;
}

const AppThemeSchema = new Schema({
    isDefault: { type: Boolean, default: false },
    client: { type: String, required: true, index: { unique: false } },
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
    version: { type: Number, required: true },
    lastUpdate: { type: Date, required: true },
    assets: { type: [String], required: true, default: [] },
    resources: { type: Schema.Types.Mixed, required: false, default: {} },
    data: { type: Schema.Types.Mixed, required: true },
});

const AppThemeModel = mongoose.model<IAppThemeDocument>("AppTheme", AppThemeSchema);

export { AppThemeModel, IAppThemeDocument };
