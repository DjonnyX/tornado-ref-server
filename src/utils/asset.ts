import { IAsset } from "src/models/Asset";

export const formatAsset = (model: IAsset) => ({
    id: model._id,
    name: model.name,
    ext: model.ext,
    path: model.path,
});