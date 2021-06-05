import { IAppTheme } from "@djonnyx/tornado-types";
import { IAppThemeItem } from "../controllers/AppThemeController";

export const formatAppThemeModel = (model: IAppTheme): IAppThemeItem => ({
    id: model.id,
    isDefault: model.isDefault,
    client: model.client,
    type: model.type,
    name: model.name,
    version: model.version,
    lastUpdate: model.lastUpdate,
    assets: model.assets,
    resources: model.resources,
    data: model.data,
});