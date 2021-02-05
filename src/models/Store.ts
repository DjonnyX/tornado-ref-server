import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IStoreDocument extends Document {
    client: string;
    name: string;
    address: string | null;
    extra?: { [key: string]: any } | null;
}

const StoreSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    name: { type: String, required: true },
    address: { type: String, required: false },
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const StoreModel = mongoose.model<IStoreDocument>("Store", StoreSchema);

export { StoreModel, IStoreDocument };
