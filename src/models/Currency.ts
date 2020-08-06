import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ICurrency extends Document {
    code: string;
    name: string;
    symbol: string;
    extra?: { [key: string]: any } | null;
}

const CurrencySchema = new Schema({
    code: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: true },
    symbol: { type: Schema.Types.String, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const CurrencyModel = mongoose.model<ICurrency>("Currency", CurrencySchema);

export { CurrencyModel, ICurrency };
