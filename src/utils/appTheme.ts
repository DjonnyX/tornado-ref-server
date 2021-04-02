import { IAppTheme } from "@djonnyx/tornado-types";
import { IAppThemeItem } from "../controllers/AppThemeController";

export const formatAppThemeModel = (model: IAppTheme): IAppThemeItem => ({
    id: model.id,
    clientId: model.clientId,
    type: model.type,
    name: model.name,
    version: model.version,
    lastUpdate: model.lastUpdate,
    data: model.data,
});