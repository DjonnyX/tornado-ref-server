import { IBackupInfo } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IBackupInfoDocument extends Document, IBackupInfo { }

const BackupSchema = new Schema({
    name: { type: String, required: false, default: null },
    size: { type: Number, required: true, default: 0 },
    lastCreate: { type: Date, required: false, default: null },
});

interface IServerInfoDocument extends Document {
    client: string;
    backup: IBackupInfoDocument;
}

const ServerInfoSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    backup: {
        type: BackupSchema, required: true
    },
});

const ServerInfoModel = mongoose.model<IServerInfoDocument>("ServerInfo", ServerInfoSchema);

export { ServerInfoModel, IServerInfoDocument };
