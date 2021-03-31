import { IAppTheme, RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
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

export const getAppThemeRefTypeByTerminalType = (type: TerminalTypes): RefTypes | undefined => {
    switch (type) {
        case TerminalTypes.KIOSK: {
            return RefTypes.THEME_KIOSK;
        }
        case TerminalTypes.ORDER_PICKER: {
            return RefTypes.THEME_ORDERPICKER;
        }
        case TerminalTypes.EQUEUE: {
            return RefTypes.THEME_EQUEUE;
        }
    }

    return undefined;
}