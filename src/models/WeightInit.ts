import { IWeightUnitContents } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IWeightUnitDocument extends Document {
    client: string;
    systemName: string;
    contents: IWeightUnitContents;
    extra?: { [key: string]: any } | null;
}

const WeightUnitSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    systemName: { type: String, required: false },
    contents: { type: Schema.Types.Mixed, default: {} },
    extra: { type: Schema.Types.Mixed, required: false },
});

const WeightUnitModel = mongoose.model<IWeightUnitDocument>("WeightUnit", WeightUnitSchema);

export { WeightUnitModel, IWeightUnitDocument };
