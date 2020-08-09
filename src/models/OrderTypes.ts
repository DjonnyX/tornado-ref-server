import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IOrderType extends Document {
    active: boolean;
    name: string;
    description?: string;
    color: string;
    assets: Array<string>;
    images: {
        main: string;
        icon: string;
    },
    extra?: { [key: string]: any } | null;
}

const TagSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    color: { type: Schema.Types.String, required: true, default: "#000000" },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    images: {
        main: { type: Schema.Types.ObjectId, required: false },
        icon: { type: Schema.Types.ObjectId, required: false },
    },
    extra: { type: Schema.Types.Mixed, required: false },
});

const OrderTypeModel = mongoose.model<IOrderType>("OrderType", TagSchema);

export { OrderTypeModel, IOrderType };