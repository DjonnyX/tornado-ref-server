import { IAsset } from "src/models/Asset";

export const formatAssetModel = (model: IAsset) => ({
    id: model._id,
    name: model.name,
    ext: model.ext,
    thumbnail: model.thumbnail,
    path: model.path,
});