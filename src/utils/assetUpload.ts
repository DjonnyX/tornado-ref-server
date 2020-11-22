import * as path from "path";
import * as sharp from "sharp";
import multer = require("multer");
import * as ffmpeg from "fluent-ffmpeg";
import * as ffmpegStatic from "ffmpeg-static";
import * as fs from "fs";
import { IAuthRequest } from "../interfaces";
import { AssetExtensions } from "@djonnyx/tornado-types";

ffmpeg.setFfmpegPath(ffmpegStatic);

export interface IFileInfo {
    active: boolean;
    name: string;
    lastUpdate: number;
    ext: AssetExtensions;
    mipmap: {
        x128: string;
        x32: string;
    };
    path: string;
}

const THUMBNAIL_WIDTH = 128;
const THUMBNAIL_HEIGHT = 128;

const THUMBNAIL_FAV_WIDTH = 32;
const THUMBNAIL_FAV_HEIGHT = 32;

export const makeThumbnail = (ext: string, pathToResource: string, width: number, height: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const thumbnailPath = path.normalize(`${pathToResource}_${width}x${height}`);
        const normalizedPathToResource = `${pathToResource}${ext}`

        if (ext === AssetExtensions.JPG || ext === AssetExtensions.PNG) {
            const normalizedThumbnailPath = `${thumbnailPath}${ext}`
            // создается миниатюра
            sharp(normalizedPathToResource)
                .ensureAlpha()
                .resize(width, height, {
                    fit: "contain",
                    background: { r: 0, g: 0, b: 0, alpha: 0 },
                })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .toFile(normalizedThumbnailPath, (err, info) => {
                    if (!!err) {
                        return reject(Error(`Thumbnail is not created. ${err}`));
                    };
                    resolve(normalizedThumbnailPath);
                });
        } else if (ext === AssetExtensions.MP4) {
            ffmpeg(normalizedPathToResource)
                .size(`${width}x${height}`)
                .outputOption("-vf", `scale=${width}:-1:flags=lanczos,fps=8`)
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {
                    resolve(`${thumbnailPath}.gif`);
                })
                .save(`${thumbnailPath}.gif`)
        }
    });
};

export const assetsUploader = (name: string, allowedExtensions: Array<AssetExtensions>, request: IAuthRequest): Promise<IFileInfo> => {
    return new Promise((resolve, reject) => {
        const EXT_PATTERN = new RegExp(`^(${allowedExtensions.map(v => `\\${v}`).join("|")})$`);
        multer({
            dest: `assets/${request.client.id}`,
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
            const filePath = `${request.file.path}${ext}`;
            fs.renameSync(request.file.path, filePath);

            makeThumbnail(ext, request.file.path, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).then(x128Path => {
                makeThumbnail(ext, request.file.path, THUMBNAIL_FAV_WIDTH, THUMBNAIL_FAV_HEIGHT).then(x32Path => {
                    resolve({
                        active: true,
                        name: request.file.originalname,
                        lastUpdate: Date.now(),
                        ext,
                        mipmap: {
                            x128: x128Path,
                            x32: x32Path,
                        },
                        path: filePath,
                    });
                });
            });
        });
    });
};