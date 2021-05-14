import { Controller, Route, Post, Tags, OperationId, Example, Request, Security } from "tsoa";
import { IAssetDocument, AssetModel } from "../models/Asset";
import { IAuthRequest } from "../interfaces";
import {
    AdModel, AppThemeModel, BusinessPeriodModel, CheckueModel, CurrencyModel, EmployeeModel, IAdDocument, IAppThemeDocument, IBusinessPeriodDocument,
    ICheckueDocument, ICurrencyDocument, IEmployeeDocument, ILanguageDocument, INodeDocument, IOrderTypeDocument,
    IProductDocument, IRefDocument, ISelectorDocument, IStoreDocument, ITagDocument, ITranslationDocument, LanguageModel, NodeModel,
    OrderTypeModel, ProductModel, RefModel, SelectorModel, StoreModel, TagModel, TranslationModel
} from "../models";
import { LeanDocument } from "mongoose";
import { zipClientBackup } from "../utils/archive";
import * as config from "../config";

interface IClientDBBackup {
    ads: LeanDocument<IAdDocument>[],
    themes: LeanDocument<IAppThemeDocument>[],
    assets: LeanDocument<IAssetDocument>[],
    businessPeriods: LeanDocument<IBusinessPeriodDocument>[],
    checkues: LeanDocument<ICheckueDocument>[],
    currencies: LeanDocument<ICurrencyDocument>[],
    employes: LeanDocument<IEmployeeDocument>[],
    languages: LeanDocument<ILanguageDocument>[],
    nodes: LeanDocument<INodeDocument>[],
    orderTypes: LeanDocument<IOrderTypeDocument>[],
    products: LeanDocument<IProductDocument>[],
    refs: LeanDocument<IRefDocument>[],
    selectors: LeanDocument<ISelectorDocument>[],
    stores: LeanDocument<IStoreDocument>[],
    tags: LeanDocument<ITagDocument>[],
    translations: LeanDocument<ITranslationDocument>[],
}

export interface IBackup {
    url: string;
    filename: string;
}

interface IBackupMeta {
    creationDate: Date;
}

interface ICreateBackupResponse {
    meta?: IBackupMeta;
    data?: IBackup;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

const META_TEMPLATE = {
    creationDate: new Date(),
};

const RESPONSE_TEMPLATE: IBackup = {
    url: "tornado.ru/backups/2sd4fff54ggx23x435h",
    filename: "backups/2sd4fff54ggx23x435h",
};

const createBackup = async (request: IAuthRequest): Promise<ICreateBackupResponse> => {
    const client = request.account.id;

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

    const refs = await RefModel.find({ client: client });
    const refsData = refs.map(ref => ref.toJSON());

    const selectors = await SelectorModel.find({ client: client });
    const selectorsData = selectors.map(selector => selector.toJSON());

    const stores = await StoreModel.find({ client: client });
    const storesData = stores.map(store => store.toJSON());

    const tags = await TagModel.find({ client: client });
    const tagsData = tags.map(tag => tag.toJSON());

    const translations = await TranslationModel.find({ client: client });
    const translationsData = translations.map(translation => translation.toJSON());

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
        refs: refsData,
        selectors: selectorsData,
        stores: storesData,
        tags: tagsData,
        translations: translationsData,
    };

    await zipClientBackup(client, clientDBBackup);

    const filename = `backups/backup_${client}`;

    return {
        meta: {
            creationDate: new Date(),
        },
        data: {
            url: `${config.CLIENT_HOST}/${filename}`,
            filename: filename,
        },
    };
};

@Route("/backup/client")
@Tags("Backup")
export class BackupController extends Controller {
    @Post("create")
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<ICreateBackupResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Request() request: IAuthRequest): Promise<ICreateBackupResponse> {
        let response: ICreateBackupResponse;
        try {
            response = await createBackup(request);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Caught error. ${err}`,
                    }
                ]
            };
        }

        return response;
    }
}
