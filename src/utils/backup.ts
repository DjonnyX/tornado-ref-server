import * as extractZip from "extract-zip";
import * as path from "path";
import * as fs from "fs-extra";
import multer = require("multer");
import { IAuthRequest } from "../interfaces";
import { IClientDBBackup } from "../controllers/BackupController";
import {
    AdModel, AppThemeModel, AssetModel, BusinessPeriodModel, CheckueModel, CurrencyModel, EmployeeModel, IAppThemeDocument, LanguageModel,
    NodeModel, OrderTypeModel, ProductModel, SelectorModel, StoreModel, SystemTagModel, TagModel, TranslationModel, WeightUnitModel
} from "../models";
import { copyDirectory, makeDirIfEmpty, readFile, removeDirectory, removeFile, saveDataToFile, getFileStat, zipDirectory } from "./file";
import * as moment from "moment";
import { TerminalTypes } from "@djonnyx/tornado-types";
import { normalizeTerminalTheme } from "./terminal";
import { getClientId } from "./account";

export const generateBackup = async (request: IAuthRequest): Promise<{ name: string, stats: fs.Stats }> => {
    const client = getClientId(request);

    const ads = await AdModel.find({ client: client });
    const adsData = ads.map(ad => ad.toJSON());

    const themes = await AppThemeModel.find({ client: client });
    const themesData = themes.map(theme => theme.toJSON());

    const assets = await AssetModel.find({ client: client });
    const assetsData = assets.map(asset => asset.toJSON());

    const businessPeriods = await BusinessPeriodModel.find({ client: client });
    const businessPeriodsData = businessPeriods.map(businessPeriod => businessPeriod.toJSON());

    const checkues = await CheckueModel.find({ client: client });
    const checkuesData = checkues.map(checkue => checkue.toJSON());

    const currencies = await CurrencyModel.find({ client: client });
    const currenciesData = currencies.map(checkue => checkue.toJSON());

    const employes = await EmployeeModel.find({ client: client });
    const employesData = employes.map(employee => employee.toJSON());

    const languages = await LanguageModel.find({ client: client });
    const languagesData = languages.map(language => language.toJSON());

    const nodes = await NodeModel.find({ client: client });
    const nodesData = nodes.map(node => node.toJSON());

    const orderTypes = await OrderTypeModel.find({ client: client });
    const orderTypesData = orderTypes.map(orderType => orderType.toJSON());

    const products = await ProductModel.find({ client: client });
    const productsData = products.map(product => product.toJSON());

    const selectors = await SelectorModel.find({ client: client });
    const selectorsData = selectors.map(selector => selector.toJSON());

    const stores = await StoreModel.find({ client: client });
    const storesData = stores.map(store => store.toJSON());

    const tags = await TagModel.find({ client: client });
    const tagsData = tags.map(tag => tag.toJSON());

    const translations = await TranslationModel.find({ client: client });
    const translationsData = translations.map(translation => translation.toJSON());

    const systemTags = await SystemTagModel.find({ client: client });
    const systemTagsData = systemTags.map(systemTag => systemTag.toJSON());

    const weightUnits = await WeightUnitModel.find({ client: client });
    const weightUnitsData = weightUnits.map(weightUnit => weightUnit.toJSON());

    const clientDBBackup: IClientDBBackup = {
        ads: adsData,
        themes: themesData,
        assets: assetsData,
        businessPeriods: businessPeriodsData,
        checkues: checkuesData,
        currencies: currenciesData,
        employes: employesData,
        languages: languagesData,
        nodes: nodesData,
        orderTypes: orderTypesData,
        products: productsData,
        selectors: selectorsData,
        stores: storesData,
        tags: tagsData,
        translations: translationsData,
        systemTags: systemTagsData,
        weightUnits: weightUnitsData,
    };

    return await zipClientBackup(client, clientDBBackup);
}

const zipClientBackup = async (client: string, dbData: IClientDBBackup): Promise<{ name: string, stats: fs.Stats }> => {
    const date = moment(new Date()).format("yyyy-MM-DD");
    const outputFileName = `backups/${client}/backup_${date}.tdb`;

    await removeDirectory(`backups/${client}`);

    await makeDirIfEmpty(`backups/${client}`);
    await makeDirIfEmpty(`backups/${client}/archive`);

    await saveDataToFile(JSON.stringify(dbData), `backups/${client}/archive/db`);

    await zipDirectory(`assets/${client}`, `backups/${client}/archive/data`);
    await zipDirectory(`backups/${client}/archive`, outputFileName);

    await removeDirectory(`backups/${client}/archive`);
    
    const stats = await getFileStat(outputFileName);

    return {
        name: outputFileName,
        stats,
    };
}

export const uploadBackup = async (request: IAuthRequest, allowedExtensions = ['.tdb']): Promise<void> => {
    await makeDirIfEmpty('backups/upload');

    return new Promise<void>((resolve, reject) => {
        const EXT_PATTERN = new RegExp(`^(${allowedExtensions.map(v => `\\${v}`).join("|")})$`);
        const client = getClientId(request);
        multer({
            dest: "backups/upload",
            fileFilter: function (req, file, cb) {
                const ext = path.extname(file.originalname);
                if (!EXT_PATTERN.test(ext)) {
                    return cb(Error("Backup extension is not supported."));
                }
                cb(null, true);
            },
        }).single("file")(request, undefined, async (error) => {
            if (!!error) {
                return reject(error);
            }

            const filePath = request.file.path;

            try {
                await removeDirectory(path.resolve(`backups/upload/${client}`));
            } catch (err) {
                return reject(Error(`Remove existing assets directory fail. ${err}`));
            }

            try {
                await extractZip(filePath, { dir: path.resolve(`backups/upload/${client}`) });
            } catch (err) {
                return reject(Error(`Extract zip fail. ${err}`));
            }

            try {
                await extractZip(`backups/upload/${client}/data`, { dir: path.resolve(`backups/upload/${client}/assets`) });
            } catch (err) {
                return reject(Error(`Extract zip1 fail. ${err}`));
            }

            try {
                let dbDataRaw = await readFile(`backups/upload/${client}/db`);
                dbDataRaw = dbDataRaw.replace(/("client":"[\w|\d]+")/g, `"client":"${client}"`);
                dbDataRaw = dbDataRaw.replace(/("assets\/[\w|\d]+\/)/g, `"assets/${client}/`);

                const dbData: IClientDBBackup = JSON.parse(dbDataRaw);

                await replaceDB(client, dbData);
            } catch (err) {
                return reject(Error(`Replace db fail. ${err}`));
            }

            try {
                await removeDirectory(`assets/${client}`);
            } catch (err) {
                return reject(Error(`Remove existing assets directory fail. ${err}`));
            }

            try {
                await copyDirectory(`backups/upload/${client}/assets`, `assets/${client}`);
            } catch (err) {
                return reject(Error(`Copy directory fail. ${err}`));
            }

            try {
                await removeDirectory(`backups/upload/${client}`);
            } catch (err) {
                return reject(Error(`Remove upload directory fail. ${err}`));
            }

            try {
                await removeFile(filePath);
            } catch (err) {
                return reject(Error(`Remove original file fail. ${err}`));
            }

            try {
                await normalizeTerminalTheme(client, TerminalTypes.KIOSK);
            } catch (err) {
                return reject(Error(`Normalization kiosk terminal theme fail. ${err}`));
            }

            try {
                await normalizeTerminalTheme(client, TerminalTypes.EQUEUE);
            } catch (err) {
                return reject(Error(`Normalization equeue terminal theme fail. ${err}`));
            }

            try {
                await normalizeTerminalTheme(client, TerminalTypes.ORDER_PICKER);
            } catch (err) {
                return reject(Error(`Normalization order-picker terminal theme fail. ${err}`));
            }

            resolve();
        });
    });
}

const replaceDB = async (client: string, data: IClientDBBackup): Promise<void> => {
    await deleteDB(client);
    await storeDB(data);
}

const deleteDB = async (client: string): Promise<void> => {
    const promises = new Array<Promise<any>>();

    const ads = await AdModel.find({ client });
    ads.forEach(async (ad) => {
        promises.push(await ad.delete());
    });

    const themes = await AppThemeModel.find({ client });
    themes.forEach(async (theme) => {
        promises.push(await theme.delete());
    });

    const assets = await AssetModel.find({ client });
    assets.forEach(async (asset) => {
        promises.push(await asset.delete());
    });

    const businessPeriods = await BusinessPeriodModel.find({ client });
    businessPeriods.forEach(async (businessPeriod) => {
        promises.push(await businessPeriod.delete());
    });

    const checkues = await CheckueModel.find({ client });
    checkues.forEach(async (checkue) => {
        promises.push(await checkue.delete());
    });

    const currencies = await CurrencyModel.find({ client });
    currencies.forEach(async (currency) => {
        promises.push(await currency.delete());
    });

    const employes = await EmployeeModel.find({ client });
    employes.forEach(async (employee) => {
        promises.push(await employee.delete());
    });

    const languages = await LanguageModel.find({ client });
    languages.forEach(async (language) => {
        promises.push(await language.delete());
    });

    const nodes = await NodeModel.find({ client });
    nodes.forEach(async (node) => {
        promises.push(await node.delete());
    });

    const orderTypes = await OrderTypeModel.find({ client });
    orderTypes.forEach(async (orderType) => {
        promises.push(await orderType.delete());
    });

    const products = await ProductModel.find({ client });
    products.forEach(async (product) => {
        promises.push(await product.delete());
    });

    const selectors = await SelectorModel.find({ client });
    selectors.forEach(async (selector) => {
        promises.push(await selector.delete());
    });

    const stores = await StoreModel.find({ client });
    stores.forEach(async (store) => {
        promises.push(await store.delete());
    });

    const tags = await TagModel.find({ client });
    tags.forEach(async (tag) => {
        promises.push(await tag.delete());
    });

    const translations = await TranslationModel.find({ client });
    translations.forEach(async (translation) => {
        promises.push(await translation.delete());
    });

    const systemTags = await SystemTagModel.find({ client });
    systemTags.forEach(async (systemTag) => {
        promises.push(await systemTag.delete());
    });

    const weightUnits = await WeightUnitModel.find({ client });
    weightUnits.forEach(async (weightUnit) => {
        promises.push(await weightUnit.delete());
    });

    await Promise.all(promises);
};

const storeDB = async (data: IClientDBBackup): Promise<void> => {
    const promises = new Array<Promise<any>>();

    promises.push(AdModel.create(data.ads));
    const tResources: { [id: string]: any } = {};
    for (const theme of data.themes) {
        tResources[theme._id] = theme.resources;
        theme.resources = {};
    }
    promises.push(AppThemeModel.create(data.themes).then(themes => {
        const promises1 = new Array<Promise<IAppThemeDocument>>();
        for (const theme of themes) {
            theme.resources = tResources[theme._id];
            theme.markModified("resources");
            promises1.push(theme.save());
        }
        return Promise.all(promises1);
    }));
    promises.push(AssetModel.create(data.assets));
    promises.push(BusinessPeriodModel.create(data.businessPeriods));
    promises.push(CheckueModel.create(data.checkues));
    promises.push(CurrencyModel.create(data.currencies));
    promises.push(EmployeeModel.create(data.employes));
    promises.push(LanguageModel.create(data.languages));
    promises.push(NodeModel.create(data.nodes));
    promises.push(OrderTypeModel.create(data.orderTypes));
    promises.push(ProductModel.create(data.products));
    promises.push(SelectorModel.create(data.selectors));
    promises.push(StoreModel.create(data.stores));
    promises.push(TagModel.create(data.tags));
    promises.push(TranslationModel.create(data.translations));
    promises.push(SystemTagModel.create(data.systemTags));
    promises.push(WeightUnitModel.create(data.weightUnits));

    await Promise.all(promises);
}

