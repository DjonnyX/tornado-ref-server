import { IOrderTypeContents } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IOrderType extends Document {
    client: string;
    active: boolean;
    isDefault: boolean;
    contents: IOrderTypeContents | {};
    extra?: { [key: string]: any } | null;
}

const OrderTypeSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    isDefault: { type: Schema.Types.Boolean, required: true, default: true },
    contents: { type: Schema.Types.Mixed, default: {} },
    extra: { type: Schema.Types.Mixed, required: false },
});

const OrderTypeModel = mongoose.model<IOrderType>("OrderType", OrderTypeSchema);

export { OrderTypeModel, IOrderType };
