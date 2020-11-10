import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IOrderTypeContentsItem {
    name: string;
    description?: string;
    color?: string;
    resources: {
        main: string | null;
        icon: string | null;
    };
    assets?: Array<string>;
    extra?: { [key: string]: any } | null;
}

export interface IOrderTypeContents {
    [lang: string]: IOrderTypeContentsItem | any;
}

interface IOrderType extends Document {
    $client: string;
    active: boolean;
    isDefault: boolean;
    name: string,
    contents: IOrderTypeContents;
    extra?: { [key: string]: any } | null;
}

const OrderTypeSchema = new Schema({
    $client: { type: String, required: true, index: { unique: true } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    isDefault: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: String, required: false },
    contents: { type: Schema.Types.Mixed, default: {} },
    extra: { type: Schema.Types.Mixed, required: false },
});

const OrderTypeModel = mongoose.model<IOrderType>("OrderType", OrderTypeSchema);

export { OrderTypeModel, IOrderType };
