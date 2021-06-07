import * as fs from "fs";
import { AdTypes, AssetExtensions, IKioskTheme, NodeTypes, RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
import {
    RefModel, NodeModel, TranslationModel, LanguageModel, CurrencyModel, AppThemeModel, AdModel, OrderTypeModel,
    ILanguageDocument, IOrderTypeDocument, AssetModel
} from "../models";
import { mergeTranslation, getTemplateLangs } from "../utils/translation";
import {
    LOCALIZATION_TEMPLATE_PATH, CURRENCY_TEMPLATE_PATH, THEMES_KIOSK_TEMPLATE_PATH,
    THEMES_ORDER_PICKER_TEMPLATE_PATH, THEMES_EQ_TEMPLATE_PATH, DEFAULT_INTRO_TEMPLATE_MANIFEST_PATH,
    DEFAULT_INTRO_TEMPLATE_DATA_PATH, DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_MANIFEST_PATH,
    DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_DATA_PATH
} from "../config";
import { ITranslationTemplate } from "../interfaces/ITranslationTemplate";
import { ICurrencyTemplate, IScreenSaverManifest } from "../interfaces";
import { riseRefVersion } from "./refs";
import { deepMergeObjects } from "../utils/object";
import { createAd } from "../utils/ad";
import { makeDirIfEmpty, readFileJSONAsync } from "../utils/file";
import { assetsUploaderFS } from "../utils/assetUpload";

const createDefaultOrderTypeIfNeed = async (client: string) => {
    const orderTypes = await OrderTypeModel.find({ client });

    if (orderTypes.length > 0) {
        return;
    }

    let defaultLang: ILanguageDocument;

    try {
        defaultLang = await LanguageModel.findOne({ client, isDefault: true });
    } catch (err) {
        console.error(`Default language not found. ${err}`)
    }

    let orderType: IOrderTypeDocument;
    try {
        orderType = new OrderTypeModel({
            client,
            active: true,
            isDefault: true,
            contents: {
                [defaultLang.code]: {
                    name: "In place",
                },
            },
        });

        await orderType.save();
    } catch (err) {
        console.error(`Default Order Type can not be created. ${err}`);
    }
};

const createDefaultIntroIfNeed = async (client: string) => {
    const ads = await AdModel.find({ client, type: AdTypes.INTRO });

    if (ads.length > 0) {
        return;
    }

    const template: IScreenSaverManifest = await readFileJSONAsync<IScreenSaverManifest>(DEFAULT_INTRO_TEMPLATE_MANIFEST_PATH);

    try {
        createAd(client, template.name, template.duration, AdTypes.INTRO, DEFAULT_INTRO_TEMPLATE_DATA_PATH);
    } catch (err) {
        console.error(err);
    }
};

const createDefaultServiceUnavailableScreensaverIfNeed = async (client: string) => {
    const ads = await AdModel.find({ client, type: AdTypes.SERVICE_UNAVAILABLE });

    if (ads.length > 0) {
        return;
    }

    const template: IScreenSaverManifest = await readFileJSONAsync<IScreenSaverManifest>(DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_MANIFEST_PATH);

    try {
        createAd(client, template.name, template.duration, AdTypes.SERVICE_UNAVAILABLE, DEFAULT_SCREENSAVER_SERVICE_UNAVAILABLE_TEMPLATE_DATA_PATH);
    } catch (err) {
        console.error(err);
    }
};

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

const mergeDefaultTheme = async (client: string, templatePath: string, type: TerminalTypes) => {
    const template = await readFileJSONAsync(templatePath);

    const promises = new Array<Promise<void>>();

    for (const themeName in template) {
        const themeData = template[themeName].data;
        promises.push(new Promise(async (resolve, reject) => {
            try {
                let theme = await AppThemeModel.findOne({
                    client,
                    type,
                    name: themeName,
                });

                if (!theme) {

                    theme = new AppThemeModel({
                        isDefault: true,
                        client,
                        type,
                        name: themeName,
                        version: 1,
                        lastUpdate: new Date(Date.now()),
                        assets: [],
                        resources: {},
                        data: themeData,
                    });

                    const savedTheme = await theme.save();

                    const themeId = savedTheme._id.toString();

                    const assetInfo = await assetsUploaderFS(client, themeId, [
                        AssetExtensions.JPG,
                        AssetExtensions.PNG,
                        AssetExtensions.GIF,
                        AssetExtensions.WEBP,
                    ], template[themeName].preview);

                    const asset = new AssetModel({ client, ...assetInfo });

                    await riseRefVersion(client, RefTypes.ASSETS);
                    await asset.save();

                    savedTheme.assets.push(asset._id);
                    savedTheme.resources["thumbnail"] = asset._id;

                    savedTheme.markModified("resources");

                    await savedTheme.save();

                    return resolve();
                }

                const data = deepMergeObjects(themeData, theme.data, true);
                theme.data = data;
                theme.version = (Number(theme.version) || 1) + 1;
                theme.lastUpdate = new Date(Date.now());
                theme.markModified("data");

                await theme.save();

                resolve();
            } catch (err) {
                reject(err);
            }
        }));
    }

    return Promise.all(promises);
};

const mergeDefaultThemes = async (client: string) => {
    try {
        await mergeDefaultTheme(client, THEMES_KIOSK_TEMPLATE_PATH, TerminalTypes.KIOSK);
    } catch (err) {
        console.error(err);
    }

    try {
        await mergeDefaultTheme(client, THEMES_ORDER_PICKER_TEMPLATE_PATH, TerminalTypes.ORDER_PICKER);
    } catch (err) {
        console.error(err);
    }

    try {
        await mergeDefaultTheme(client, THEMES_EQ_TEMPLATE_PATH, TerminalTypes.EQUEUE);
    } catch (err) {
        console.error(err);
    }
};

const mergeDefaultTranslations = async (client: string) => {
    const template: ITranslationTemplate = await readFileJSONAsync<ITranslationTemplate>(LOCALIZATION_TEMPLATE_PATH);
    const availableLangs = getTemplateLangs(template);

    const dictionary: { [key: string]: ILanguageDocument } = {};
    const langs = await LanguageModel.find({
        client,
    });

    langs.forEach(item => {
        dictionary[item.code] = item;
    });

    const promises = new Array<Promise<void>>();
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

export const initRootEnvironment = async (): Promise<void> => {
    await makeDirIfEmpty("backups");
    await makeDirIfEmpty("assets");
}

const initEnvironment = async (client: string): Promise<void> => {
    try {
        await makeDirIfEmpty(`assets/${client}`);
    } catch (err) {
        console.error(`Init environment fail. ${err}`);
    }
}

export const initRefs = async (client: string): Promise<void> => {
    await initEnvironment(client);

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

    await createDefaultIntroIfNeed(client);

    await createDefaultServiceUnavailableScreensaverIfNeed(client);

    // root node
    await createRootNode(client);

    // themes
    await mergeDefaultThemes(client);

    // translations
    await mergeDefaultTranslations(client);

    // order type
    await createDefaultOrderTypeIfNeed(client);

    // default currency
    await createDefaultCurrencyFromTemplate(client);

    console.info(`Refs for client "${client}" are initialized.`);
};