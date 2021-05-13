import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IEmployeeDocument extends Document {
    client: string;
    devices: Array<string>;
    active: boolean;
    name: string;
    extra?: { [key: string]: any } | null;
}

const EmployeeSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    devices: [{ type: Schema.Types.String, required: true }],
    active: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: Schema.Types.String, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const EmployeeModel = mongoose.model<IEmployeeDocument>("Employee", EmployeeSchema);

export { EmployeeModel, IEmployeeDocument };
