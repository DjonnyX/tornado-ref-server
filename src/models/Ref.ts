import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IRef extends Document {
    $client: string;
    name: string;
    version: number;
    lastupdate: Date;
}

const RefSchema = new Schema({
    $client: { type: String, required: true, index: true },
    name: { type: String, required: true },
    version: { type: Number, required: true },
    lastupdate: { type: Date, required: true },
});

const RefModel = mongoose.model<IRef>("Ref", RefSchema);

export { RefModel, IRef };
