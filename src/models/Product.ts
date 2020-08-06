import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { IProductItem } from "src/controllers/ProductsController";

interface IReceiptItem {
    name: string;
    description: string;
    calories: number;
    quantity: number;
}

interface IProduct extends Document {
    active: boolean;
    name: string;
    description: string;x
    receipt: Array<IReceiptItem>;
    tags: Array<string>;
    joint: string;
    assets: Array<string>;
    mainAsset: string;
    extra?: { [key: string]: any } | null;
}

const ReceiptSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    calories: { type: Schema.Types.Number, required: false },
    quantity: { type: Schema.Types.Number, required: false },
});

const ProductSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    receipt: [ReceiptSchema],
    tags: [{ type: Schema.Types.ObjectId }],
    joint: { type: Schema.Types.ObjectId, required: true },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    mainAsset: { type: Schema.Types.ObjectId },
    extra: { type: Schema.Types.Mixed, required: false },
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export { ProductModel, IProduct, IReceiptItem };
