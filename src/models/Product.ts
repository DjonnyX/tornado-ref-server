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

export interface IProductContentsItem {
    name: string;
    description?: string;
    color?: string;
    resources: {
        main: string | null;
        thumbnail: string | null;
        icon: string | null;
    };
    assets?: Array<string>;
    gallery?: Array<string>;
    extra?: { [key: string]: any } | null;
}

export interface IProductContents {
    [lang: string]: IProductContentsItem | any;
}

interface IProduct extends Document {
    active: boolean;
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
    active: { type: Schema.Types.Boolean, required: true, default: true },
    contents: { type: Schema.Types.Mixed, default: {} },
    prices: [PriceSchema],
    receipt: [ReceiptSchema],
    tags: [{ type: Schema.Types.ObjectId }],
    joint: { type: Schema.Types.ObjectId, required: true },
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export { ProductModel, IProduct, IReceiptItem };
