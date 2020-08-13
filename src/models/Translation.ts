import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface ITranslate extends Document {
    key: string;
    value: string;
    extra?: { [key: string]: any } | null;
}

const TranslateSchema = new Schema({
    key: { type: Schema.Types.String, required: true },
    value: { type: Schema.Types.String },
    extra: { type: Schema.Types.Mixed, required: false },
});

interface ITranslation extends Document {
    items: Array<ITranslate>;
    extra?: { [key: string]: any } | null;
}

const TranslationSchema = new Schema({
    items: [{ type: TranslateSchema, default: [] }],
    extra: { type: Schema.Types.Mixed, required: false },
});

const TranslationModel = mongoose.model<ITranslation>("Translation", TranslationSchema);

export { TranslationModel, ITranslation };
