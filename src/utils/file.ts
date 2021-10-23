import * as archiver from "archiver";
import * as fs from "fs-extra";

export function readFileJSONAsync<T = any>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        fs.readFile(path, {
            encoding: "utf-8",
        }, (err, data) => {
            if (!!err) {
                return reject(err);
            }

            try {
                const json = JSON.parse(data.toString("utf8")) as T;
                resolve(json);
            } catch (err) {
                reject(err);
            }
        });
    });
}

export function getFileStat(path: string): Promise<fs.Stats> {
    return new Promise<fs.Stats>((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (!!err) {
                return reject(err);
            }
            resolve(stats);
        });
    });
}

export const zipDirectory = (source: string, out: string): Promise<void> => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(out);

    return new Promise<void>((resolve, reject) => {
        archive
            .directory(source, false)
            .on('error', err => reject(err))
            .pipe(stream)
            ;

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

export const zipAppendData = (source: Array<any>, out: string): Promise<void> => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(out);

    return new Promise<void>((resolve, reject) => {

        source.forEach(source => {
            archive.append(Buffer.from(JSON.stringify(source)), { name: out });
        })
        archive.on('error', err => reject(err)).pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

export const removeFile = (source: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        fs.unlink(source, (err => {
            if (!!err) {
                // etc
            }

            resolve();
        }))
    });
}

export const removeDirectory = (source: string): Promise<void> => {
    return fs.rmdir(source, { recursive: true, maxRetries: 3, retryDelay: 100 })
}

export const copyDirectory = (source: string, target: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        fs.copy(source, target, (err => {
            if (!!err) {
                // etc
            }

            resolve();
        }))
    });
}

export const readFile = (source: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(source, ((err, data) => {
            if (!!err) {
                reject("Read file fail.");
                return;
            }

            resolve(data.toString('utf8'));
        }))
    });
}

export const saveDataToFile = (source: string, output: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(output, source, (err => {
            if (!!err) {
                reject(err);
                return;
            }

            resolve();
        }))
    });
}

export const makeDirIfEmpty = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.stat(src, (err, stats) => {
            if (!!err) {
                fs.mkdir(src, () => {
                    resolve();
                });

                return;
            }

            resolve();
        });
    });
}