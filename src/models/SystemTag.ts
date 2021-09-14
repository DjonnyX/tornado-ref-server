import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ISystemTagDocument extends Document {
    client: string;
    position: number;
    name: string;
    extra?: { [key: string]: any } | null;
}

const SystemTagSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    position: { type: Number, require: true, default: 0 },
    name: { type: String, required: false },
    extra: { type: Schema.Types.Mixed, required: false },
});

const SystemTagModel = mongoose.model<ISystemTagDocument>("SystemTag", SystemTagSchema);

export { SystemTagModel, ISystemTagDocument };
