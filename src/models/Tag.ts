import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface ITagContentsItem {
    name: string;
    description?: string;
    color?: string;
    images: {
        main: string | null;
        icon: string | null;
    };
    assets?: Array<string>;
    extra?: { [key: string]: any } | null;
}

export interface ITagContents {
    [lang: string]: ITagContentsItem | any;
}

interface ITag extends Document {
    active: boolean;
    contents: ITagContents;
    extra?: { [key: string]: any } | null;
}

const TagSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true, default: true },
    contents: { type: Schema.Types.Mixed, default: {} },
    extra: { type: Schema.Types.Mixed, required: false },
});

const TagModel = mongoose.model<ITag>("Tag", TagSchema);

export { TagModel, ITag };
