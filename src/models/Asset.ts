import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { AssetExtensions } from "./enums";

interface IAsset extends Document {
    name: string;
    lastupdate: number;
    ext: AssetExtensions;
    mipmap: {
        x128: string;
        x32: string;
    };
    path: string;
}

const AssetSchema = new Schema({
    name: { type: String, required: true },
    lastupdate: { type: Number, required: true },
    ext: {
        type: String, enum: [
            AssetExtensions.JPG,
            AssetExtensions.PNG,
            AssetExtensions.OBJ,
            AssetExtensions.FBX,
            AssetExtensions.COLLADA
        ],
        required: true
    },
    mipmap: {
        x128: { type: Schema.Types.String, required: false, },
        x32: { type: Schema.Types.String, required: false, },
    },
    path: { type: String, required: true },
});

const AssetModel = mongoose.model<IAsset>("Asset", AssetSchema);

export { AssetModel, IAsset };
