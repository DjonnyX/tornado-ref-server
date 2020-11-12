import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { SelectorTypes } from "./enums/SelectorTypes";

export interface ISelectorContentsItem {
    name: string;
    description?: string;
    color?: string;
    resources: {
        main: string | null;
        icon: string | null;
    };
    assets?: Array<string>;
    extra?: { [key: string]: any } | null;
}

export interface ISelectorContents {
    [lang: string]: ISelectorContentsItem | any;
}

interface ISelector extends Document {
    client: string;
    active: boolean;
    name: string;
    type: SelectorTypes;
    contents: ISelectorContents;
    joint: string;
    extra?: { [key: string]: any } | null;
}

const SelectorSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: String, required: false },
    type: {
        type: Schema.Types.String, enum: [
            SelectorTypes.MENU_CATEGORY,
            SelectorTypes.SCHEMA_CATEGORY,
        ], required: true
    },
    contents: { type: Schema.Types.Mixed, default: {} },
    joint: { type: Schema.Types.ObjectId, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const SelectorModel = mongoose.model<ISelector>("Selector", SelectorSchema);

export { SelectorModel, ISelector };
