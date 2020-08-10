import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ILanguage extends Document {
    active: boolean;
    name: string;
    description?: string;
    color: string;
    assets: Array<string>;
    images: {
        main: string;
        icon: string;
    };
    extra?: { [key: string]: any } | null;
}

const LanguageSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    color: { type: Schema.Types.String, required: true, default: "#000000" },
    images: {
        main: { type: Schema.Types.ObjectId, required: false },
        icon: { type: Schema.Types.ObjectId, required: false },
    },
    extra: { type: Schema.Types.Mixed, required: false },
});

const LanguageModel = mongoose.model<ILanguage>("Language", LanguageSchema);

export { LanguageModel, ILanguage };
