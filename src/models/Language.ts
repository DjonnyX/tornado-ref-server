import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ILanguage extends Document {
    active: boolean;
    name: string;
    assets: Array<string>;
    images: {
        main: string;
    };
    translation: string;
    extra?: { [key: string]: any } | null;
}

const LanguageSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: Schema.Types.String, required: true },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    images: {
        main: { type: Schema.Types.ObjectId, required: false },
    },
    translation: { type: Schema.Types.ObjectId, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const LanguageModel = mongoose.model<ILanguage>("Language", LanguageSchema);

export { LanguageModel, ILanguage };
