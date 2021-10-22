import { makeDirIfEmpty } from "../utils/file";

export const initEnvironment = async (client: string): Promise<void> => {
    try {
        await makeDirIfEmpty(`assets/${client}`);
    } catch (err) {
        console.error(`Init environment fail. ${err}`);
    }
}