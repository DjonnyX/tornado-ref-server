import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IReceiptItem {
    name: string;
    description: string;
    calories: number;
    quantity: number;
}

interface IProduct extends Document {
    name: string;
    description: string;
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    joint: string;
    assets: Array<string>;
    mainAsset: string;
}

const ReceiptSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    calories: { type: Schema.Types.Number, required: false },
    quantity: { type: Schema.Types.Number, required: false },
});

const ProductSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    receipt: [ReceiptSchema],
    tags: [{ type: Schema.Types.ObjectId }],
    joint: { type: Schema.Types.ObjectId, required: true },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    mainAsset: { type: Schema.Types.ObjectId },
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export { ProductModel, IProduct, IReceiptItem };
