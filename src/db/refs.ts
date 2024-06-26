import { IRef } from "@djonnyx/tornado-types";
import { RefModel, IRefDocument } from "../models/index";
import { findAllWithFilter } from "../utils/requestOptions";

export const getRef = async (client: string, name: string,
    additionalSearch?: { [prop: string]: string | number }): Promise<IRef> => {

    let ref: IRefDocument;
    try {
        ref = await findAllWithFilter(RefModel.findOne({ client, name }), { query: additionalSearch || {} });
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

export const riseRefVersion = async (client: string, name: string,
    additionalSearch?: { [prop: string]: string | number }): Promise<IRef> => {

    let ref: IRefDocument;
    try {
        ref = await findAllWithFilter(RefModel.findOne({ client, name }), { query: additionalSearch || {} });
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