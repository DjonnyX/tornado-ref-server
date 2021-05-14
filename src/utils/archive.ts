import * as archiver from "archiver";
import * as fs from "fs";

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

export const zipAppendData = (source: JSON, out: string): Promise<void> => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(out);

    return new Promise<void>((resolve, reject) => {
        archive
            .append(Buffer.from(JSON.stringify(source)), { name: out })
            .on('error', err => reject(err))
            .pipe(stream)
            ;

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

export const zipClientBackup = async (client: string, dbData: Object): Promise<void> => {

    await removeFile(`backups/backup_${client}`);
    await removeDirectory(`backups/${client}`);

    await makeDirIfEmpty(`backups/${client}`);

    await saveDataToFile(JSON.stringify(dbData), `backups/${client}/db`);

    await zipDirectory(`assets/${client}`, `backups/${client}/data`);
    await zipDirectory(`backups/${client}`, `backups/backup_${client}`);

    await removeDirectory(`backups/${client}`);
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
    return new Promise<void>((resolve, reject) => {
        fs.rmdir(source, (err => {
            if (!!err) {
                // etc
            }

            resolve();
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