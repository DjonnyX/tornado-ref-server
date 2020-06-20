import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ITag extends Document {
    name: string;
    description?: string;
    color: string;
}

const TagSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    color: [{ type: String, required: true }]
});

const TagModel = mongoose.model<ITag>("Tag", TagSchema);

export { TagModel, ITag };
