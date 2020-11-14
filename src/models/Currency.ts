import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ICurrency extends Document {
    client: string;
    active: boolean;
    isDefault: boolean;
    code: string;
    name: string;
    symbol: string;
    extra?: { [key: string]: any } | null;
}

const CurrencySchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    isDefault: { type: Schema.Types.Boolean, required: true, default: true },
    code: { type: Schema.Types.String, unique: false, required: true },
    name: { type: Schema.Types.String, required: true },
    symbol: { type: Schema.Types.String, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const CurrencyModel = mongoose.model<ICurrency>("Currency", CurrencySchema);

export { CurrencyModel, ICurrency };
