import { RefModel, RefTypes, NodeModel } from "../models/index";
import { NodeTypes } from "../models/enums";

const createRootNode = async () => {
    const existsRootNode = await NodeModel.findOne({ type: NodeTypes.KIOSK_ROOT });

    if (!existsRootNode) {
        // generate new root node
        const rootMenuNode = new NodeModel({
            active: true,
            type: NodeTypes.KIOSK_ROOT,
            parentId: null,
            contentId: null,
            children: [],
            extra: {},
        });
        await rootMenuNode.save();
    }
};

export const initRefs = async (): Promise<void> => {

    const lastUpdate = Date.now();

    const INITIAL_STATE = [
        {
            name: RefTypes.ROLES,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.USERS,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.NODES,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.PRODUCTS,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.SELECTORS,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.ASSETS,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.TAGS,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.BUSINESS_PERIODS,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.CURRENCIES,
            version: 1,
            lastUpdate,
        }, {
            name: RefTypes.ADS,
            version: 1,
            lastUpdate,
        },
    ];

    for (let i = 0, l = INITIAL_STATE.length; i < l; i++) {
        const refData = INITIAL_STATE[i];
        const existsRef = await RefModel.findOne({ name: refData.name });
        if (existsRef) {
            continue;
        }
        const model = new RefModel(refData);
        await model.save();
    }

    // root node
    await createRootNode();

    console.info("Refs are initialized.");
};