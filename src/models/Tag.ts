import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ITag extends Document {
    active: boolean;
    name: string;
    description?: string;
    color: string;
    extra?: { [key: string]: any } | null;
}

const TagSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    color: { type: Schema.Types.String, required: true, default: "rgba(255, 255, 255, 0)" },
    extra: { type: Schema.Types.Mixed, required: false },
});

const TagModel = mongoose.model<ITag>("Tag", TagSchema);

export { TagModel, ITag };
