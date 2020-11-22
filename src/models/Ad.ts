import { AdTypes, IAdContents } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IAd extends Document {
    client: string;
    active: boolean;
    type: AdTypes;
    name: string;
    contents: IAdContents;
    extra?: { [key: string]: any } | null;
}

const AdSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Boolean, required: true, default: true },
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
