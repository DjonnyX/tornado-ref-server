import { ITagContents } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ITagDocument extends Document {
    client: string;
    active: boolean;
    contents: ITagContents | {};
    extra?: { [key: string]: any } | null;
}

const TagSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Boolean, required: true, default: true },
    name: { type: String, required: false },
    contents: { type: Schema.Types.Mixed, default: {} },
    extra: { type: Schema.Types.Mixed, required: false },
});

const TagModel = mongoose.model<ITagDocument>("Tag", TagSchema);

export { TagModel, ITagDocument };
