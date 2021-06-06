import { AssetExtensions } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IAssetDocument extends Document {
    client: string;
    active: boolean;
    name: string;
    lastUpdate: Date;
    ext: AssetExtensions;
    mipmap: {
        x128: string;
        x32: string;
    };
    path: string;
    extra: any;
}

export const AssetSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Boolean, required: true, default: true },
    name: { type: String, required: true },
    lastUpdate: { type: Date, required: true },
    ext: {
        type: String, enum: [
            AssetExtensions.JPG,
            AssetExtensions.PNG,
            AssetExtensions.GIF,
            AssetExtensions.WEBP,
            AssetExtensions.MP4,
        ],
        required: true,
    },
    mipmap: {
        x128: { type: String, required: false, },
        x32: { type: String, required: false, },
    },
    path: { type: String, required: true },
    extra: { type: Schema.Types.Mixed, default: {} },
});

const AssetModel = mongoose.model<IAssetDocument>("Asset", AssetSchema);

export { AssetModel, IAssetDocument };
