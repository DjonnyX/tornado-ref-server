import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface ILanguageContentsItem {
    name: string;
    color?: string;
    images: {
        main: string | null;
    };
    assets?: Array<string>;
    extra?: { [key: string]: any } | null;
}

export interface ILanguageContents {
    [lang: string]: ILanguageContentsItem | any;
}

interface ILanguage extends Document {
    active: boolean;
    isDefault: boolean;
    code: string;
    contents: ILanguageContents;
    translation: string;
    extra?: { [key: string]: any } | null;
}

const LanguageSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true, default: true },
    isDefault: { type: Schema.Types.Boolean, required: true, default: true },
    code: { type: Schema.Types.String, unique: true, required: true },
    contents: { type: Schema.Types.Mixed, default: {} },
    translation: { type: Schema.Types.ObjectId, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const LanguageModel = mongoose.model<ILanguage>("Language", LanguageSchema);

export { LanguageModel, ILanguage };
