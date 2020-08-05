import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { SelectorTypes } from "./enums/SelectorTypes";

interface ISelector extends Document {
    active: boolean;
    type: SelectorTypes;
    name: string;
    description?: string;
    joint: string;
    assets: Array<string>;
    mainAsset: string;
    extra?: { [key: string]: any } | null;
}

const SelectorSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true },
    type: {
        type: Schema.Types.String, enum: [
            SelectorTypes.MENU_CATEGORY,
            SelectorTypes.SCHEMA_CATEGORY,
        ], required: true
    },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    joint: { type: Schema.Types.ObjectId, required: true },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    mainAsset: { type: Schema.Types.ObjectId },
    extra: { type: Schema.Types.Mixed, required: false },
});

const SelectorModel = mongoose.model<ISelector>("Selector", SelectorSchema);

export { SelectorModel, ISelector };
