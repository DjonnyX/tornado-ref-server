import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { AdTypes, IAdContents } from "@djonnyx/tornado-types";

interface IAd extends Document {
    client: string;
    active: boolean;
    type: AdTypes;
    contents: IAdContents;
    extra?: { [key: string]: any } | null;
}

const AdSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Boolean, required: true, default: true },
    type: {
        type: String,
        enum: [
            AdTypes.SERVICE_UNAVAILABLE,
            AdTypes.BANNER,
            AdTypes.INTRO,
        ],
    },
    contents: { type: Schema.Types.Mixed, default: {} },
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const AdModel = mongoose.model<IAd>("Ad", AdSchema);

export { AdModel, IAd };
