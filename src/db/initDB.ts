import * as fs from "fs";
import { RefModel, RefTypes, NodeModel, TranslationModel, LanguageModel, ILanguage, CurrencyModel, ICurrency } from "../models/index";
import { NodeTypes } from "../models/enums";
import { mergeTranslation, getTemplateLangs } from "../utils/translation";
import { LOCALIZATION_TEMPLATE_PATH, CURRENCY_TEMPLATE_PATH } from "../config";
import { ITranslationTemplate } from "../interfaces/ITranslationTemplate";
import { ICurrencyTemplate } from "../interfaces";
import { riseRefVersion } from "./refs";


const createRootNode = async () => {
    const existsRootNode = await NodeModel.findOne({ type: NodeTypes.KIOSK_ROOT });

    if (!existsRootNode) {
        // generate new root node
        const rootMenuNode = new NodeModel({
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

const mergeDefaultTranslations = async () => {
    const template: ITranslationTemplate = JSON.parse(fs.readFileSync(LOCALIZATION_TEMPLATE_PATH).toString("utf-8"));
    const availableLangs = getTemplateLangs(template);
    
    const dictionary: { [key: string]: ILanguage } = {};
    const langs = await LanguageModel.find({});

    langs.forEach(item => {
        dictionary[item.code] = item;
    });

    const promises = new Array<Promise<any>>();
    availableLangs.forEach(lang => {
        if (!dictionary[lang.code]) {
            const newTranslation = new TranslationModel({
                language: lang.code,
            });
            const newLang = new LanguageModel({
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
    
    const translations = await TranslationModel.find({});

    if (!!translations) {
        const promises = new Array<Promise<any>>();
        translations.forEach(translation => {
            promises.push(mergeTranslation(translation));
        });

        return Promise.all(promises);
    }
}

const createDefaultCurrencyFromTemplate = async () => {
    const template: ICurrencyTemplate = JSON.parse(fs.readFileSync(CURRENCY_TEMPLATE_PATH).toString("utf-8"));
    
    const currencies = await CurrencyModel.find({});
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
            isDefault: !isDefaultSetted,
            active: true,
            name: template.name,
            code: template.code,
            symbol: template.symbol,
        });

        await templateCurrency.save();

        await riseRefVersion(RefTypes.CURRENCIES);
    }
}

export const initRefs = async (): Promise<void> => {

    const lastupdate = Date.now();

    const INITIAL_STATE = [
        {
            name: RefTypes.ROLES,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.USERS,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.NODES,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.PRODUCTS,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.SELECTORS,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.ASSETS,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.TAGS,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.BUSINESS_PERIODS,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.CURRENCIES,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.ADS,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.LANGUAGES,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.ORDER_TYPES,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.TRANSLATIONS,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.STORES,
            version: 1,
            lastupdate,
        }, {
            name: RefTypes.TERMINALS,
            version: 1,
            lastupdate,
        },
    ];

    for (let i = 0, l = INITIAL_STATE.length; i < l; i++) {
        const refData = INITIAL_STATE[i];
        const existsRef = await RefModel.findOne({ name: refData.name });
        if (existsRef) {
            continue;
        }
        const model = new RefModel(refData);
        await model.save();
    }

    // root node
    await createRootNode();

    // translations
    await mergeDefaultTranslations();

    // default currency
    await createDefaultCurrencyFromTemplate();

    console.info("Refs are initialized.");
};