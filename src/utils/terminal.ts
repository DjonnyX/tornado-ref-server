import { ITerminalDocument } from "@models";

export const formatTerminalModel = (model: ITerminalDocument) => ({
    id: model.id,
    clientId: model.clientId,
    status: model.status,
    type: model.type,
    name: model.name,
    storeId: model.storeId,
    lastwork: model.lastwork,
    imei: model.imei,
    licenseId: model.licenseId,
    extra: model.extra,
});
