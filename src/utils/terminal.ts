import { ITerminalEQConfig, ITerminalKioskConfig, ITerminalOrderPickerConfig, TerminalTypes } from "@djonnyx/tornado-types";
import { ITerminalDocument } from "@models";

export const formatTerminalModel = (model: ITerminalDocument) => ({
    id: model.id,
    client: model.client,
    status: model.status,
    type: model.type,
    name: model.name,
    storeId: model.storeId,
    lastwork: model.lastwork,
    imei: model.imei,
    licenseId: model.licenseId,
    config: model.config,
    extra: model.extra,
});

export const createTerminalConfig = (type: TerminalTypes) => {
    switch (type) {
        case TerminalTypes.KIOSK: {
            const kioskDefaultConfig: ITerminalKioskConfig = {
                theme: "light",
                suffix: "K",
            };

            return kioskDefaultConfig;
        }
        case TerminalTypes.ORDER_PICKER: {
            const orderPickerDefaultConfig: ITerminalOrderPickerConfig = {
                theme: "dark",
            };

            return orderPickerDefaultConfig;
        }
        case TerminalTypes.EQUEUE: {
            const eqDefaultConfig: ITerminalEQConfig = {
                theme: "light",
                layout: {
                    new: {
                        columns: 2,
                        rows: 5,
                    },
                    complete: {
                        columns: 2,
                        rows: 5,
                    }
                }
            };

            return eqDefaultConfig;
        }
        default:
            throw Error(`Config for terminal type "${type}" is not defined.`);
    }
}