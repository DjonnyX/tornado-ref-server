import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface ITranslateDocument extends Document {
    key: string;
    value: string;
    extra?: { [key: string]: any } | null;
}

const TranslateSchema = new Schema({
    key: { type: Schema.Types.String, required: true },
    value: { type: Schema.Types.String },
    extra: { type: Schema.Types.Mixed, required: false },
});

interface ITranslationDocument extends Document {
    client: string;
    language: string;
    items: Array<ITranslateDocument>;
    extra?: { [key: string]: any } | null;
}

const TranslationSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    language: { type: Schema.Types.String, unique: false, required: true },
    items: [{ type: TranslateSchema, default: [] }],
    extra: { type: Schema.Types.Mixed, required: false },
});

const TranslationModel = mongoose.model<ITranslationDocument>("Translation", TranslationSchema);

export { TranslationModel, ITranslationDocument };
