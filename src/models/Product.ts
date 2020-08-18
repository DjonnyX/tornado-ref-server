import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IReceiptItem {
    name: string;
    description: string;
    calories: number;
    quantity: number;
    extra?: { [key: string]: any } | null;
}

export interface IPrice {
    value: number;
    currency: string;
    extra?: { [key: string]: any } | null;
}

export interface IProductContent {
    name: string;
    description: string;
    color: string;
    images: {
        main: string;
        thumbnail: string;
        icon: string;
    };
    assets: Array<string>;
    extra?: { [key: string]: any } | null;
}

interface IProduct extends Document {
    active: boolean;
    content: {
        [lang: string]: IProductContent;
    };
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

const ContentSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    color: { type: Schema.Types.String, required: true, default: "rgba(255, 255, 255, 0)" },
    images: {
        main: { type: Schema.Types.ObjectId, required: false },
        thumbnail: { type: Schema.Types.ObjectId, required: false },
        icon: { type: Schema.Types.ObjectId, required: false },
    },
    assets: [{ type: Schema.Types.ObjectId, required: true }],
    extra: { type: Schema.Types.Mixed, required: false },
});

const ProductSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true, default: true },
    content: { type: Schema.Types.Map, of: ContentSchema },
    prices: [PriceSchema],
    receipt: [ReceiptSchema],
    tags: [{ type: Schema.Types.ObjectId }],
    joint: { type: Schema.Types.ObjectId, required: true },
    extra: { type: Schema.Types.Mixed, required: false },
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export { ProductModel, IProduct, IReceiptItem };
