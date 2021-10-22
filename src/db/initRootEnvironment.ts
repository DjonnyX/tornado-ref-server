import { makeDirIfEmpty } from "../utils/file";

export const initRootEnvironment = async (): Promise<void> => {
    await makeDirIfEmpty("backups");
    await makeDirIfEmpty("assets");
}