import { RefModel, IRef } from "../models/index";
import { IRefItem } from "../controllers/RefsController";

export const getRef = async (client: string, name: string): Promise<IRefItem> => {
    let ref: IRef;
    try {
        ref = await RefModel.findOne({ client, name });
    } catch (e) {
        throw Error("Error in getting reference.");
    }

    if (!ref) {
        ref = new RefModel({ client, name, version: 1, lastUpdate: new Date(Date.now()) });
        await ref.save();
    }

    return {
        name: ref.name,
        version: ref.version,
        lastUpdate: ref.lastUpdate
    };
};

export const riseRefVersion = async (client: string, name: string): Promise<IRefItem> => {
    let ref: IRef;
    try {
        ref = await RefModel.findOne({ client, name });
    } catch (e) {
        throw Error("Error in getting reference.");
    }
    ref.version++;
    ref.lastUpdate = new Date(Date.now());
    try {
        await ref.save();
    } catch (e) {
        throw Error("Error in saving reference.");
    }
    return {
        name: ref.name,
        version: ref.version,
        lastUpdate: ref.lastUpdate
    };
};