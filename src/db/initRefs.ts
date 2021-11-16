import { RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
import { RefModel } from "../models";

export const initRefs = async (client: string) => {
    const lastUpdate = Date.now();

    const INITIAL_STATE = [
        {
            client,
            name: RefTypes.NODES,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.PRODUCTS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.SELECTORS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.ASSETS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.TAGS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.BUSINESS_PERIODS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.CURRENCIES,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.ADS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.LANGUAGES,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.ORDER_TYPES,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.TRANSLATIONS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.STORES,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.TERMINALS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.CHECKUES,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.SYSTEM_TAGS,
            version: 1,
            lastUpdate,
        }, {
            client,
            name: RefTypes.WEIGHT_UNITS,
            version: 1,
            lastUpdate,
        },
    ];

    const THEMES = [
        {
            client,
            name: RefTypes.THEMES,
            version: 1,
            lastUpdate,
            extra: {
                type: TerminalTypes.KIOSK,
            },
        }, {
            client,
            name: RefTypes.THEMES,
            version: 1,
            lastUpdate,
            extra: {
                type: TerminalTypes.ORDER_PICKER,
            },
        }, {
            client,
            name: RefTypes.THEMES,
            version: 1,
            lastUpdate,
            extra: {
                type: TerminalTypes.EQUEUE,
            },
        },
    ];

    for (let i = 0, l = INITIAL_STATE.length; i < l; i++) {
        const refData = INITIAL_STATE[i];
        const existsRef = await RefModel.findOne({
            client,
            name: refData.name,
        });
        if (!!existsRef) {
            continue;
        }
        const model = new RefModel(refData);
        await model.save();
    }

    for (let i = 0, l = THEMES.length; i < l; i++) {
        const refData = THEMES[i];
        const existsRef = await RefModel.findOne({
            client,
            name: refData.name,
            extra: {
                type: refData.extra.type,
            },
        });
        if (!!existsRef) {
            continue;
        }
        const model = new RefModel(refData);
        await model.save();
    }
}