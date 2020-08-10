import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IAd extends Document {
    active: boolean;
    name: string;
    description?: string;
    color: string;
    assets: Array<string>;
    images: {
        original: string;
    }
    extra?: { [key: string]: any } | null;
}

const AdSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    color: { type: Schema.Types.String, required: true, default: "#000000" },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    images: {
        original: { type: Schema.Types.ObjectId, required: false },
    },
    extra: { type: Schema.Types.Mixed, required: false },
});

const AdModel = mongoose.model<IAd>("Ad", AdSchema);

export { AdModel, IAd };
