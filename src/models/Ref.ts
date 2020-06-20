import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IRef extends Document {
    name: string;
    version: number;
    lastUpdate: number;
}

const RefSchema = new Schema({
    name: { type: String, required: true },
    version: [{ type: Number, required: true }],
    lastUpdate: [{ type: Number, required: true }]
});

const RefModel = mongoose.model<IRef>("Ref", RefSchema);

export { RefModel, IRef };
