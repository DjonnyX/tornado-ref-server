import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ISelector extends Document {
    active: boolean;
    name: string;
    description?: string;
    joint: string;
    extra?: { [key: string]: any } | null;
}

const SelectorSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    joint: { type: Schema.Types.ObjectId, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const SelectorModel = mongoose.model<ISelector>("Selector", SelectorSchema);

export { SelectorModel, ISelector };
