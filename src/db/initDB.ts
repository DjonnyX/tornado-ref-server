import { RefModel, RefTypes } from "../models/index";

export const initRefs = async (): Promise<void> => {

    const refs = await RefModel.find({});
    if (refs.length > 0) return;

    const lastUpdate = Date.now();

    const INITIAL_STATE = [
        {
            name: RefTypes.ROLES,
            version: 1,
            lastUpdate
        },
        {
            name: RefTypes.USERS,
            version: 1,
            lastUpdate
        }, {
            name: RefTypes.NODES,
            version: 1,
            lastUpdate
        },
        {
            name: RefTypes.PRODUCTS,
            version: 1,
            lastUpdate
        }, {
            name: RefTypes.SELECTORS,
            version: 1,
            lastUpdate
        }, {
            name: RefTypes.TAGS,
            version: 1,
            lastUpdate
        },
    ];

    for (let i = 0, l = INITIAL_STATE.length; i < l; i++) {
        const refData = INITIAL_STATE[i];
        const model = new RefModel(refData);
        await model.save();
    }

    console.info("Refs are initialized.");
};