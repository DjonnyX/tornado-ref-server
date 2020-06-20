import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ISelector extends Document {
    name: string;
    description?: string;
    tags: Array<string>;
}

const SelectorSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    tags: [{ type: Schema.Types.ObjectId }],
});

const SelectorModel = mongoose.model<ISelector>("Selector", SelectorSchema);

export { SelectorModel, ISelector };
