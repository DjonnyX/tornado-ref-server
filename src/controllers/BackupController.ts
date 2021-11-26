import { Controller, Route, Post, Tags, OperationId, Example, Request, Security } from "tsoa";
import * as fs from "fs-extra";
import { IAssetDocument } from "../models/Asset";
import { IAuthRequest } from "../interfaces";
import {
    IAdDocument, IAppThemeDocument, IBusinessPeriodDocument,
    ICheckueDocument, ICurrencyDocument, IEmployeeDocument, ILanguageDocument, INodeDocument, IOrderTypeDocument,
    IProductDocument, ISelectorDocument, IServerInfoDocument, IStoreDocument, ISystemTagDocument, ITagDocument, ITranslationDocument, IWeightUnitDocument, ServerInfoModel
} from "../models";
import { LeanDocument } from "mongoose";
import { generateBackup, uploadBackup } from "../utils/backup";
import * as config from "../config";
import { getClientId } from "../utils/account";

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
    weightUnits: LeanDocument<IWeightUnitDocument>[];
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

export const BACKUP_RESPONSE_TEMPLATE: IBackup = {
    url: "tornado.ru/backups/2sd4fff54ggx23x435h.tdb",
    filename: "backups/2sd4fff54ggx23x435h.tdb",
};

@Route("/backup/client")
@Tags("Backup")
export class BackupController extends Controller {
    @Post("create")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<ICreateBackupResponse>({
        meta: META_TEMPLATE,
        data: BACKUP_RESPONSE_TEMPLATE
    })
    public async create(@Request() request: IAuthRequest): Promise<ICreateBackupResponse> {
        const client = getClientId(request);

        let backupInfo: {name: string, stats: fs.Stats};
        try {
            backupInfo = await generateBackup(request);
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

        let serverInfo: IServerInfoDocument;
        try {
            serverInfo = await ServerInfoModel.findOne({ client });
            serverInfo.backup.name = backupInfo.name;
            serverInfo.backup.size = backupInfo.stats.size;
            serverInfo.backup.lastCreate = new Date();

            await serverInfo.save();
        } catch (err) {
            // etc
        }

        return {
            meta: {
                creationDate: new Date(),
            },
            data: {
                url: `${config.CLIENT_HOST}/${backupInfo.name}`,
                filename: backupInfo.name,
            },
        };
    }

    @Post("upload")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
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
