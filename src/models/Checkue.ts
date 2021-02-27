import { IScenario } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { ScenarioSchema } from "./Scenario";

interface ICheckueDocument extends Document {
    client: string;
    active: boolean;
    name: string;
    scenarios: Array<IScenario>;
    extra?: { [key: string]: any } | null;
}

const CheckueSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Boolean, required: true, default: true },
    name: { type: String, required: true },
    scenarios: [ScenarioSchema],
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const CheckueModel = mongoose.model<ICheckueDocument>("Checkue", CheckueSchema);

export { CheckueModel, ICheckueDocument };
