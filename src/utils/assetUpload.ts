import * as express from "express";
import * as path from "path";
import * as sharp from "sharp";
import multer = require("multer");
import { AssetExtensions } from "../models/enums";

export interface IFileInfo {
    name: string;
    ext: AssetExtensions;
    thumbnail: string;
    path: string;
}

const THUMBNAIL_WIDTH = 128;
const THUMBNAIL_HEIGHT = 128;

export const makeThumbnail = (ext: string, pathToImage: string, width: number, height: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const thumbnailPath = path.normalize(`${pathToImage}_${width}x${height}`);

        // создается миниатюра
        sharp(pathToImage)
            .resize(width, height)
            .toFile(thumbnailPath, (err, info) => { 
                if (!!err) {
                    return reject(Error(`Thumbnail is not created. ${err}`));
                };
                resolve(thumbnailPath);
            });
    });
};

export const assetsUploader = (name: string, allowedExtensions: Array<AssetExtensions>, request: express.Request): Promise<IFileInfo> => {
    return new Promise((resolve, reject) => {
        const EXT_PATTERN = new RegExp(`^(${allowedExtensions.map(v => `\\${v}`).join("|")})$`);
        multer({
            dest: "assets/",
            fileFilter: function (req, file, cb) {
                const ext = path.extname(file.originalname);
                if (!EXT_PATTERN.test(ext)) {
                    return cb(Error("Asset extension is not supported."));
                }
                cb(null, true);
            },
        }).single(name)(request, undefined, (error) => {
            if (!!error) {
                return reject(error);
            }

            const ext = path.extname(request.file.originalname) as AssetExtensions;
            
            makeThumbnail(ext, request.file.path, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).then(pathToThumbnail => {
                resolve({
                    name: request.file.originalname,
                    ext,
                    thumbnail: pathToThumbnail,
                    path: request.file.path,
                });
            });
        });
    });
};