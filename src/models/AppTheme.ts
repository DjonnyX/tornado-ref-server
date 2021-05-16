import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { TerminalTypes } from "@djonnyx/tornado-types";

interface IAppThemeDocument extends Document {
    client: string;
    type: TerminalTypes;
    name: string;
    version: number;
    lastUpdate: Date;
    data: any;
}

const AppThemeSchema = new Schema({
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
    data: { type: Schema.Types.Mixed, required: true },
});

const AppThemeModel = mongoose.model<IAppThemeDocument>("AppTheme", AppThemeSchema);

export { AppThemeModel, IAppThemeDocument };
