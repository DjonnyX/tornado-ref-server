import { IPrice, IProductContents } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IReceiptItem {
    name: string;
    description: string;
    calories: number;
    quantity: number;
    extra?: { [key: string]: any } | null;
}

interface IProductDocument extends Document {
    client: string;
    active: boolean;
    name: string;
    contents: IProductContents;
    prices: Array<IPrice>;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    joint: string;
    extra?: { [key: string]: any } | null;
}

const ReceiptSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    calories: { type: Schema.Types.Number, required: false },
    quantity: { type: Schema.Types.Number, required: false },
    extra: { type: Schema.Types.Mixed, required: false },
});

const PriceSchema = new Schema({
    value: { type: Schema.Types.Number, required: true },
    currency: { type: Schema.Types.String, required: false },
    extra: { type: Schema.Types.Mixed, required: false },
});

const ProductSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: String, required: false },
    contents: { type: Schema.Types.Mixed, default: {} },
    prices: [PriceSchema],
    receipt: [ReceiptSchema],
    tags: [{ type: Schema.Types.ObjectId }],
    joint: { type: Schema.Types.ObjectId, required: true },
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const ProductModel = mongoose.model<IProductDocument>("Product", ProductSchema);

export { ProductModel, IProductDocument, IReceiptItem };
