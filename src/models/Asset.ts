import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { AssetExtensions } from "./enums";

interface IAsset extends Document {
    active: boolean;
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
    active: { type: Schema.Types.Boolean, required: true },
    name: { type: Schema.Types.String, required: true },
    lastupdate: { type: Schema.Types.Number, required: true },
    ext: {
        type: Schema.Types.String, enum: [
            AssetExtensions.JPG,
            AssetExtensions.PNG,
            AssetExtensions.OBJ,
            AssetExtensions.FBX,
            AssetExtensions.COLLADA,
        ],
        required: true,
    },
    mipmap: {
        x128: { type: Schema.Types.String, required: false, },
        x32: { type: Schema.Types.String, required: false, },
    },
    path: { type: String, required: true },
});

const AssetModel = mongoose.model<IAsset>("Asset", AssetSchema);

export { AssetModel, IAsset };
