import { RefTypes } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IRef extends Document {
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
    ], required: true },
    version: { type: Number, required: true },
    lastUpdate: { type: Date, required: true },
    extra: { type: Schema.Types.Mixed },
});

const RefModel = mongoose.model<IRef>("Ref", RefSchema);

export { RefModel, IRef };
