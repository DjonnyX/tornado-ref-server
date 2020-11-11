import { RefModel, IRef } from "../models/index";
import { IRefItem } from "../controllers/RefsController";

export const getRef = async (client: string, name: string): Promise<IRefItem> => {
    let ref: IRef;
    try {
        ref = await RefModel.findOne({ name, client: client });
    } catch (e) {
        throw Error("Error in getting reference.");
    }
    return {
        name: ref.name,
        version: ref.version,
        lastupdate: ref.lastupdate
    };
};

export const riseRefVersion = async (client: string, name: string): Promise<IRefItem> => {
    let ref: IRef;
    try {
        ref = await RefModel.findOne({ name, client: client });
    } catch (e) {
        throw Error("Error in getting reference.");
    }
    ref.version++;
    ref.lastupdate = new Date(Date.now());
    try {
        await ref.save();
    } catch (e) {
        throw Error("Error in saving reference.");
    }
    return {
        name: ref.name,
        version: ref.version,
        lastupdate: ref.lastupdate
    };
};