import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ILanguageDocument extends Document {
    client: string;
    active: boolean;
    isDefault: boolean;
    code: string;
    name: string;
    assets: Array<string>;
    resources: {
        main: string;
    };
    translation: string;
    extra?: { [key: string]: any } | null;
}

const LanguageSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    isDefault: { type: Schema.Types.Boolean, required: true, default: true },
    code: { type: Schema.Types.String, unique: false, required: true },
    name: { type: Schema.Types.String, required: true },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    resources: {
        main: { type: Schema.Types.ObjectId, required: false },
    },
    translation: { type: Schema.Types.ObjectId, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const LanguageModel = mongoose.model<ILanguageDocument>("Language", LanguageSchema);

export { LanguageModel, ILanguageDocument };
