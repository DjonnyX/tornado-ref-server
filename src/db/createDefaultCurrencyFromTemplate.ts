import { RefTypes } from "@djonnyx/tornado-types";
import { CurrencyModel } from "../models";
import { CURRENCY_TEMPLATE_PATH } from "../config";
import { ICurrencyTemplate } from "../interfaces";
import { readFileJSONAsync } from "../utils/file";
import { riseRefVersion } from "./refs";

export const createDefaultCurrencyFromTemplate = async (client: string) => {
    const template: ICurrencyTemplate = await readFileJSONAsync<ICurrencyTemplate>(CURRENCY_TEMPLATE_PATH);

    const currencies = await CurrencyModel.find({ client });
    let isDefaultSetted = false;
    let isTemplateCurrencyExists = false;

    currencies.forEach(item => {
        if (item.isDefault) {
            isDefaultSetted = true;
        }
        if (item.code === template.code) {
            isTemplateCurrencyExists = true;
        }
    });

    if (!isTemplateCurrencyExists) {
        const templateCurrency = new CurrencyModel({
            client,
            isDefault: !isDefaultSetted,
            active: true,
            name: template.name,
            code: template.code,
            symbol: template.symbol,
        });

        await templateCurrency.save();

        await riseRefVersion(client, RefTypes.CURRENCIES);
    }
}