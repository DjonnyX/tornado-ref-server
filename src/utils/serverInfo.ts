import { IRefServerInfo } from "@djonnyx/tornado-types";
import { IServerInfoDocument } from "../models";

export const formatServerInfoModel = (model: IServerInfoDocument): IRefServerInfo => {
    return {
        backup: {
            name: model.backup.name,
            size: model.backup.size,
            lastCreate: model.backup.lastCreate,
        }
    }
}