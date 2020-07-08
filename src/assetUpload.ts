import * as express from "express";
import * as path from "path";
import multer = require("multer");
import { AssetExtensions } from "./models/enums";

export interface IFileInfo {
    name: string;
    ext: AssetExtensions;
    path: string;
}

export const assetsUploader = (name: string, allowedExtensions: Array<AssetExtensions>, request: express.Request): Promise<IFileInfo> => {
    return new Promise((resolve, reject) => {
        multer({
            dest: "assets/",
            fileFilter: function(req, file, cb) {
                if (!!file) {
                    const EXT_PATTERN = new RegExp(`^(${allowedExtensions.join("|")})$`);
                    const ext = path.extname(file.originalname);
                    if (EXT_PATTERN.test(ext)) {
                        return cb(Error("Asset extension is not supported."));
                    }
                }
                cb(null, true);
            },
        }).single(name)(request, undefined, async (error) => {
            if (error) {
                reject(error);
            }
            resolve({
                name: request.file.filename,
                ext: path.extname(request.file.originalname) as AssetExtensions,
                path: request.file.path,
            });
        });
    });
};