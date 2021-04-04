import * as path from "path";
import * as sharp from "sharp";
import multer = require("multer");
import * as ffmpeg from "fluent-ffmpeg";
import * as ffmpegStatic from "ffmpeg-static";
import * as fs from "fs";
import { AssetExtensions } from "@djonnyx/tornado-types";
import { IAuthRequest } from "../interfaces";

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

const decodeVideo = (ext: string, pathToResource: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const normalizedPathToResource = `${pathToResource}${ext}`;
        const normalizedTmpPathToResource = `${pathToResource}-tmp${ext}`;
        console.log(normalizedPathToResource)
        console.log(normalizedTmpPathToResource)
        try {
            ffmpeg(normalizedPathToResource)
                .outputOptions("-c:v libx264")
                .size("1920x?")
                .noAudio()
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {
                    try {
                        fs.unlinkSync(normalizedPathToResource);
                        fs.renameSync(normalizedTmpPathToResource, normalizedPathToResource);
                    } catch (err) {
                        return reject(err);
                    }
                    resolve(normalizedPathToResource);
                })
                .save(normalizedTmpPathToResource)
        } catch (err) {
            return reject(err);
        }
    });
}

const makeThumbnail = (ext: string, pathToResource: string, width: number, height: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const thumbnailPath = path.normalize(`${pathToResource}_${width}x${height}`);
        const normalizedPathToResource = `${pathToResource}${ext}`

        if (ext === AssetExtensions.JPG || ext === AssetExtensions.PNG) {
            const normalizedThumbnailPath = `${thumbnailPath}${ext}`
            // создается миниатюра
            try {
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
            } catch (err) {
                return reject(err);
            }
        } else if (ext === AssetExtensions.MP4) {
            try {
                ffmpeg(normalizedPathToResource)
                    .size(`${width}x${height}`)
                    .outputOption("-vf", `scale=${width}:-1:flags=lanczos,fps=8`)
                    .on('error', (err) => {
                        return reject(err);
                    })
                    .on('end', () => {
                        resolve(`${thumbnailPath}.gif`);
                    })
                    .save(`${thumbnailPath}.gif`)
            } catch (err) {
                return reject(err);
            }
        }
    });
};

export const assetsUploader = (name: string, allowedExtensions: Array<AssetExtensions>, request: IAuthRequest): Promise<IFileInfo> => {
    return new Promise((resolve, reject) => {
        const EXT_PATTERN = new RegExp(`^(${allowedExtensions.map(v => `\\${v}`).join("|")})$`);
        multer({
            dest: `assets/${request.account.id}`,
            fileFilter: function (req, file, cb) {
                const ext = path.extname(file.originalname);
                if (!EXT_PATTERN.test(ext)) {
                    return cb(Error("Asset extension is not supported."));
                }
                cb(null, true);
            },
        }).single(name)(request, undefined, async (error) => {
            if (!!error) {
                return reject(error);
            }

            const ext = path.extname(request.file.originalname) as AssetExtensions;
            const filePath = `${request.file.path}${ext}`;

            fs.rename(request.file.path, filePath, err => {
                if (!!err) {
                    return reject(err);
                }

                if (ext === AssetExtensions.MP4) {
                    decodeVideo(ext, request.file.path).then(filePath => {
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
                } else {
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
                }
            });
        });
    });
};

const PATTERN_FILENAME = /([^\\\/]+)$/;

function transferAssetData(src: string, dest: string): Promise<{
    name: string;
    path: string;
    size: number;
    ext: string;
}> {
    return new Promise((resolve, reject) => {
        fs.copyFile(src, dest, (err) => {
            if (!!err) {
                return reject(err);
            }

            fs.stat(dest, (err, stats) => {
                if (!!err) {
                    return reject(err);
                }

                const ext = path.extname(dest);

                const nameSrc = dest.match(PATTERN_FILENAME);
                const name = nameSrc.length > 0 ? nameSrc[0] : "unnamed";

                resolve({
                    name: name.replace(ext, ""),
                    ext: path.extname(dest),
                    path: dest.replace(name, "").replace(/(\\|\/)$/, ""),
                    size: stats.size,
                });
            });
        })
    });
}

export const assetsUploaderFS = (client: string, id: string, allowedExtensions: Array<AssetExtensions>, src: string): Promise<IFileInfo> => {
    return new Promise<IFileInfo>(async (resolve, reject) => {

        const EXT_PATTERN = new RegExp(`^(${allowedExtensions.map(v => `\\${v}`).join("|")})$`);

        const dest = `assets/${client}/${id}${path.extname(src)}`;
        const assetData = await transferAssetData(src, dest);

        if (!EXT_PATTERN.test(assetData.ext)) {
            return reject(Error("Asset extension is not supported."));
        }

        const ext = assetData.ext as AssetExtensions;
        const fileName = assetData.name;
        const filePath = path.join(assetData.path, fileName);

        makeThumbnail(ext, filePath, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).then(x128Path => {
            makeThumbnail(ext, filePath, THUMBNAIL_FAV_WIDTH, THUMBNAIL_FAV_HEIGHT).then(x32Path =>
                resolve({
                    active: true,
                    name: fileName,
                    lastUpdate: Date.now(),
                    ext,
                    mipmap: {
                        x128: x128Path,
                        x32: x32Path,
                    },
                    path: filePath,
                })
            );
        });
    });
};