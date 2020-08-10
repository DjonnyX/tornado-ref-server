import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ITranslation extends Document {
    key: string;
    value: string;
    extra?: { [key: string]: any } | null;
}

const TranslationSchema = new Schema({
    key: { type: Schema.Types.String, required: true },
    value: { type: Schema.Types.String },
    extra: { type: Schema.Types.Mixed, required: false },
});

const TranslationModel = mongoose.model<ITranslation>("Translation", TranslationSchema);

export { TranslationModel, ITranslation };
