import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { AssetExtensions } from "./enums";

interface IAsset extends Document {
    name: string;
    ext: AssetExtensions;
    thumbnail: string;
    path: string;
}

const AssetSchema = new Schema({
    name: { type: String, required: true },
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
    thumbnail: { type: Schema.Types.String, required: false, },
    path: { type: String, required: true },
});

const AssetModel = mongoose.model<IAsset>("Asset", AssetSchema);

export { AssetModel, IAsset };
