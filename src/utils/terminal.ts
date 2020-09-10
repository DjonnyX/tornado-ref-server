import { ITerminalDocument } from "@models";

export const formatTerminalModel = (model: ITerminalDocument) => ({
    id: model._id,
    status: model.status,
    type: model.type,
    name: model.name,
    store: model.store,
    lastwork: model.lastwork,
    extra: model.extra,
});
