import { IAsset } from "src/models/Asset";
import { IAssetItem } from "src/controllers/AssetsController";

export const formatAssetModel = (model: IAsset): IAssetItem => ({
    id: model._id,
    active: model.active,
    lastupdate: model.lastupdate,
    name: model.name,
    ext: model.ext,
    mipmap: model.mipmap,
    path: model.path,
});