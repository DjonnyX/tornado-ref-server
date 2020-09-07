import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { AdTypes } from "./enums";

export interface IAdContentsItem {
    name: string;
    color?: string;
    resources: {
        main: string | null;
    };
    assets?: Array<string>;
    extra?: { [key: string]: any } | null;
}

export interface IAdContents {
    [lang: string]: IAdContentsItem | any;
}

interface IAd extends Document {
    active: boolean;
    type: AdTypes;
    name: string;
    contents: IAdContents;
    extra?: { [key: string]: any } | null;
}

const AdSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true },
    name: { type: String, required: false },
    type: {
        type: String,
        enum: [
            AdTypes.BANNER,
            AdTypes.INTRO,
        ],
    },
    contents: { type: Schema.Types.Mixed, default: {} },
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const AdModel = mongoose.model<IAd>("Ad", AdSchema);

export { AdModel, IAd };
