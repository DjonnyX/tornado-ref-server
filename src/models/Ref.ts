import { RefTypes } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IRefDocument extends Document {
    client: string;
    name: string;
    version: number;
    lastUpdate: Date;
    extra?: any;
}

const RefSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    name: { type: String, enum: [
        RefTypes.ACCOUNTS,
        RefTypes.ADS,
        RefTypes.APPLICATIONS,
        RefTypes.ASSETS,
        RefTypes.BUSINESS_PERIODS,
        RefTypes.CHECKUES,
        RefTypes.CURRENCIES,
        RefTypes.LANGUAGES,
        RefTypes.NODES,
        RefTypes.ORDER_TYPES,
        RefTypes.PRODUCTS,
        RefTypes.SELECTORS,
        RefTypes.STORES,
        RefTypes.TAGS,
        RefTypes.TERMINALS,
        RefTypes.TRANSLATIONS,
        RefTypes.THEMES,
        RefTypes.SYSTEM_TAGS,
        RefTypes.WEIGHT_UNITS,
    ], required: true },
    version: { type: Number, required: true },
    lastUpdate: { type: Date, required: true },
    extra: { type: Schema.Types.Mixed, default: {} },
});

const RefModel = mongoose.model<IRefDocument>("Ref", RefSchema);

export { RefModel, IRefDocument };
