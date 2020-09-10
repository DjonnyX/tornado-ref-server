import { IStoreDocument } from "@models";

export const formatStoreModel = (model: IStoreDocument) => ({
    id: model._id,
    active: model.active,
    name: model.name,
    address: model.address,
    terminals: model.terminals,
    employes: model.employes,
    extra: model.extra,
});
