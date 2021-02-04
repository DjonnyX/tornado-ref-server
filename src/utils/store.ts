import { IStoreDocument } from "@models";

export const formatStoreModel = (model: IStoreDocument) => ({
    id: model._id,
    name: model.name,
    address: model.address,
    extra: model.extra,
});
