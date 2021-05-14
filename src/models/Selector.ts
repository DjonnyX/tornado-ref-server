import { ISelectorContents, SelectorTypes } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ISelectorDocument extends Document {
    client: string;
    active: boolean;
    type: SelectorTypes;
    contents: ISelectorContents;
    joint?: string;
    extra?: { [key: string]: any } | null;
}

const SelectorSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    type: {
        type: Schema.Types.String, enum: [
            SelectorTypes.MENU_CATEGORY,
            SelectorTypes.SCHEMA_CATEGORY,
        ], required: true
    },
    contents: { type: Schema.Types.Mixed, default: {} },
    joint: { type: Schema.Types.ObjectId, required: false },
    extra: { type: Schema.Types.Mixed, required: false },
});

const SelectorModel = mongoose.model<ISelectorDocument>("Selector", SelectorSchema);

export { SelectorModel, ISelectorDocument };
