import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IStore {
    active: boolean;
    name: string;
    address: string | null;
    terminals?: Array<string>;
    employes?: Array<string>;
    extra?: { [key: string]: any } | null;
}

interface IStoreDocument extends Document, IStore {}

const AdSchema = new Schema({
    active: { type: Boolean, required: true, default: true },
    name: { type: String, required: true },
    address: { type: String, required: false },
    terminals: [{ type: Schema.Types.ObjectId }],
    employes: [{ type: Schema.Types.ObjectId }],
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const StoreModel = mongoose.model<IStoreDocument>("Store", AdSchema);

export { StoreModel, IStoreDocument, IStore };
