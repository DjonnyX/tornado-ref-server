import { IAsset } from "src/models/Asset";

export const formatAssetModel = (model: IAsset) => ({
    id: model._id,
    lastupdate: model.lastupdate,
    name: model.name,
    ext: model.ext,
    mipmap: model.mipmap,
    path: model.path,
});