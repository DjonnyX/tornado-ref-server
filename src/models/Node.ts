import { IScenario, NodeTypes } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { ScenarioSchema } from "./Scenario";

interface INodeDocument extends Document {
    client: string;
    active: boolean;
    /**
     * Тип нода
     */
    type: NodeTypes;
    /**
     * Идентификатор родительского нода
     */
    parentId: string;
    /**
     * Идентификатор Selector или Product
     */
    contentId: string;
    /**
     * Список дочерних нодов
     */
    children: Array<string>;
    /**
     * Сценарии
     */
    scenarios: Array<IScenario>;
    extra?: { [key: string]: any } | null;
}

const NodeSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    type: {
        type: String, enum: [
            NodeTypes.SELECTOR,
            NodeTypes.PRODUCT,
            NodeTypes.KIOSK_ROOT,
            NodeTypes.KIOSK_PRESETS_ROOT,
            NodeTypes.SELECTOR_JOINT,
            NodeTypes.PRODUCT_JOINT,
            NodeTypes.SELECTOR_NODE
        ], required: true
    },
    parentId: { type: Schema.Types.ObjectId },
    contentId: { type: Schema.Types.ObjectId },
    children: [{ type: Schema.Types.ObjectId }],
    scenarios: [ScenarioSchema],
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const NodeModel = mongoose.model<INodeDocument>("Node", NodeSchema);

export { NodeModel, INodeDocument, IScenario };
