import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { SelectorTypes } from "./enums/SelectorTypes";

interface ISelector extends Document {
    active: boolean;
    type: SelectorTypes;
    name: string;
    color: string;
    description?: string;
    joint: string;
    assets: Array<string>;
    images: {
        original: string;
        thumbnail: string;
        icon: string;
    };
    extra?: { [key: string]: any } | null;
}

const SelectorSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true, default: true },
    type: {
        type: Schema.Types.String, enum: [
            SelectorTypes.MENU_CATEGORY,
            SelectorTypes.SCHEMA_CATEGORY,
        ], required: true
    },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    color: { type: Schema.Types.String, required: true, default: "rgba(255, 255, 255, 0)" },
    joint: { type: Schema.Types.ObjectId, required: true },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    images: {
        original: { type: Schema.Types.ObjectId, required: false },
        thumbnail: { type: Schema.Types.ObjectId, required: false },
        icon: { type: Schema.Types.ObjectId, required: false }
    },
    extra: { type: Schema.Types.Mixed, required: false },
});

const SelectorModel = mongoose.model<ISelector>("Selector", SelectorSchema);

export { SelectorModel, ISelector };
