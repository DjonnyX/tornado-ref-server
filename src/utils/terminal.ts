import { ITerminalEQConfig, ITerminalKioskConfig, ITerminalOrderPickerConfig, TerminalTypes } from "@djonnyx/tornado-types";
import { AppThemeModel, IAppThemeDocument, ITerminalDocument, TerminalModel } from "../models";

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

export const createTerminalConfig = (type: TerminalTypes, theme: string) => {
    switch (type) {
        case TerminalTypes.KIOSK: {
            const kioskDefaultConfig: ITerminalKioskConfig = {
                theme,
                suffix: "K",
            };

            return kioskDefaultConfig;
        }
        case TerminalTypes.ORDER_PICKER: {
            const orderPickerDefaultConfig: ITerminalOrderPickerConfig = {
                theme,
            };

            return orderPickerDefaultConfig;
        }
        case TerminalTypes.EQUEUE: {
            const eqDefaultConfig: ITerminalEQConfig = {
                theme,
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

export const normalizeTerminalTheme = async (client: string, type: TerminalTypes): Promise<void> => {
    await new Promise<void>(async (resolve, reject) => {
        let defaultTheme: IAppThemeDocument;
        try {
            defaultTheme = await AppThemeModel.findOne({ client, type, name: "light" });
        } catch (err) {
            return reject(`Caught error. ${err}`);
        }

        let themes: Array<IAppThemeDocument>;
        try {
            themes = await AppThemeModel.find({ client, type });
        } catch (err) {
            return reject(`Caught error. ${err}`);
        }

        let terminals: Array<ITerminalDocument>;
        try {
            terminals = await TerminalModel.find({ client, type });
        } catch (err) {
            return reject(`Terminals not found. ${err}`);
        }

        try {
            const promises1 = new Array<Promise<ITerminalDocument>>();
            for (const terminal of terminals) {
                if (!themes.find(theme => terminal.config.theme === String(theme._id))) {
                    terminal.config.theme = String(defaultTheme?._id);
                    terminal.markModified("config");
                    promises1.push(terminal.save());
                }
            }
            await Promise.all(promises1);
        } catch (err) {
            return reject(`Set default theme fail. ${err}`);
        }

        return resolve();
    });
}