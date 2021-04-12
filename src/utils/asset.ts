import { IAssetDocument } from "../models/Asset";
import { IAssetItem } from "../controllers/AssetsController";

export const formatAssetModel = (model: IAssetDocument): IAssetItem => ({
    id: model._id,
    active: model.active,
    lastUpdate: model.lastUpdate,
    name: model.name,
    ext: model.ext,
    mipmap: model.mipmap,
    path: model.path,
});