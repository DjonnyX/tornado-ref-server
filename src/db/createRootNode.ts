import { NodeTypes } from "@djonnyx/tornado-types";
import { NodeModel } from "../models";

export const createRootNode = async (client: string) => {
    const existsRootNode = await NodeModel.findOne({ client, type: NodeTypes.KIOSK_ROOT });

    if (!existsRootNode) {
        // generate new root node
        const rootMenuNode = new NodeModel({
            client,
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