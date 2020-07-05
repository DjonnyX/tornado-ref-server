import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ISelector extends Document {
    name: string;
    description?: string;
    joint: string;
}

const SelectorSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    joint: { type: Schema.Types.ObjectId, required: true },
});

const SelectorModel = mongoose.model<ISelector>("Selector", SelectorSchema);

export { SelectorModel, ISelector };
