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
    client: string;
    language: string;
    items: Array<ITranslate>;
    extra?: { [key: string]: any } | null;
}

const TranslationSchema = new Schema({
    client: { type: String, required: true, index: { unique: true } },
    language: { type: Schema.Types.String, unique: true, required: true },
    items: [{ type: TranslateSchema, default: [] }],
    extra: { type: Schema.Types.Mixed, required: false },
});

const TranslationModel = mongoose.model<ITranslation>("Translation", TranslationSchema);

export { TranslationModel, ITranslation };
