import { Controller, Route, Post, Tags, OperationId, Example, Request, Security } from "tsoa";
import { IAssetDocument } from "../models/Asset";
import { IAuthRequest } from "../interfaces";
import {
    IAdDocument, IAppThemeDocument, IBusinessPeriodDocument,
    ICheckueDocument, ICurrencyDocument, IEmployeeDocument, ILanguageDocument, INodeDocument, IOrderTypeDocument,
    IProductDocument, ISelectorDocument, IStoreDocument, ISystemTagDocument, ITagDocument, ITranslationDocument
} from "../models";
import { LeanDocument } from "mongoose";
import { generateBackup, uploadBackup } from "../utils/backup";
import * as config from "../config";

export interface IClientDBBackup {
    ads: LeanDocument<IAdDocument>[];
    themes: LeanDocument<IAppThemeDocument>[];
    assets: LeanDocument<IAssetDocument>[];
    businessPeriods: LeanDocument<IBusinessPeriodDocument>[];
    checkues: LeanDocument<ICheckueDocument>[];
    currencies: LeanDocument<ICurrencyDocument>[];
    employes: LeanDocument<IEmployeeDocument>[];
    languages: LeanDocument<ILanguageDocument>[];
    nodes: LeanDocument<INodeDocument>[];
    orderTypes: LeanDocument<IOrderTypeDocument>[];
    products: LeanDocument<IProductDocument>[];
    selectors: LeanDocument<ISelectorDocument>[];
    stores: LeanDocument<IStoreDocument>[];
    tags: LeanDocument<ITagDocument>[];
    translations: LeanDocument<ITranslationDocument>[];
    systemTags: LeanDocument<ISystemTagDocument>[];
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

interface IUploadBackupResponse {
    meta?: IBackupMeta;
    data?: any;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

const META_TEMPLATE = {
    creationDate: new Date(),
};

const RESPONSE_TEMPLATE: IBackup = {
    url: "tornado.ru/backups/2sd4fff54ggx23x435h.tdb",
    filename: "backups/2sd4fff54ggx23x435h.tdb",
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
        let fileName: string;
        try {
            fileName = await generateBackup(request);
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

        return {
            meta: {
                creationDate: new Date(),
            },
            data: {
                url: `${config.CLIENT_HOST}/${fileName}`,
                filename: fileName,
            },
        };
    }

    @Post("upload")
    @Security("clientAccessToken")
    @OperationId("Upload")
    @Example<IUploadBackupResponse>({
        meta: META_TEMPLATE,
        data: {}
    })
    public async upload(@Request() request: IAuthRequest): Promise<IUploadBackupResponse> {
        try {
            await uploadBackup(request);
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

        return {
            meta: {
                creationDate: new Date(),
            },
            data: {},
        };
    }
}
