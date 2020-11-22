import * as fs from "fs";
import { RefModel, RefTypes, NodeModel, TranslationModel, LanguageModel, ILanguage, CurrencyModel } from "../models/index";
import { mergeTranslation, getTemplateLangs } from "../utils/translation";
import { LOCALIZATION_TEMPLATE_PATH, CURRENCY_TEMPLATE_PATH } from "../config";
import { ITranslationTemplate } from "../interfaces/ITranslationTemplate";
import { ICurrencyTemplate } from "../interfaces";
import { riseRefVersion } from "./refs";
import { NodeTypes } from "@djonnyx/tornado-types";


const createRootNode = async (client: string) => {
    const existsRootNode = await NodeModel.findOne({ client, type: NodeTypes.KIOSK_ROOT });

    if (!existsRootNode) {
        // generate new root node
        const rootMenuNode = new NodeModel({
            client,
            active: true,
            type: NodeTypes.KIOSK_ROOT,
            parentId: null,
            contentId: null,
            children: [],
            extra: {},
        });
        await rootMenuNode.save();
    }
};

const mergeDefaultTranslations = async (client: string) => {
    const template: ITranslationTemplate = JSON.parse(fs.readFileSync(LOCALIZATION_TEMPLATE_PATH).toString("utf-8"));
    const availableLangs = getTemplateLangs(template);

    const dictionary: { [key: string]: ILanguage } = {};
    const langs = await LanguageModel.find({
        client,
    });

    langs.forEach(item => {
        dictionary[item.code] = item;
    });

    const promises = new Array<Promise<any>>();
    availableLangs.forEach(lang => {
        if (!dictionary[lang.code]) {
            const newTranslation = new TranslationModel({
                client,
                language: lang.code,
            });
            const newLang = new LanguageModel({
                client,
                isDefault: lang.isDefault || false,
                name: lang.name,
                code: lang.code,
                translation: newTranslation._id,
            });
            promises.push(new Promise(async (resolve) => {
                await newTranslation.save();
                await newLang.save();
                resolve();
            }));
        }
    });

    await Promise.all(promises);

    const translations = await TranslationModel.find({ client });

    if (!!translations) {
        const promises = new Array<Promise<any>>();
        translations.forEach(translation => {
            promises.push(mergeTranslation(translation));
        });

        return Promise.all(promises);
    }
}

const createDefaultCurrencyFromTemplate = async (client: string) => {
    const template: ICurrencyTemplate = JSON.parse(fs.readFileSync(CURRENCY_TEMPLATE_PATH).toString("utf-8"));

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

export const initRefs = async (client: string): Promise<void> => {

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
        },
    ];

    for (let i = 0, l = INITIAL_STATE.length; i < l; i++) {
        const refData = INITIAL_STATE[i];
        const existsRef = await RefModel.findOne({
            client,
            name: refData.name,
        });
        if (existsRef) {
            continue;
        }
        const model = new RefModel(refData);
        await model.save();
    }

    // root node
    await createRootNode(client);

    // translations
    await mergeDefaultTranslations(client);

    // default currency
    await createDefaultCurrencyFromTemplate(client);

    console.info(`Refs for client "${client}" are initialized.`);
};