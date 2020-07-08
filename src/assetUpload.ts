import multer = require("multer");
import * as express from "express";
import * as path from "path";
import { AssetExtensions } from "./models/enums";

export interface IFileInfo {
    name: string;
    ext: AssetExtensions;
    path: string;
}

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    },
});

export const assetsUploader = (name: string, request: express.Request): Promise<IFileInfo> => {
    return new Promise((resolve, reject) => {
        multer({ storage, dest: "assets/" }).single(name)(request, undefined, async (error: any) => {
            if (error) {
                reject(error);
            }
            resolve({
                name: request.file.filename,
                ext: path.extname(request.file.originalname) as AssetExtensions,
                path: path.extname(request.file.originalname),
            });
        });
    });
};