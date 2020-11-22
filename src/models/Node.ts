import { IScenario, NodeTypes, ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes, ScenarioProgrammActionTypes, ScenarioSelectorActionTypes } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface INode extends Document {
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

const ScenarioSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true, default: true },
    action: {
        type: Schema.Types.String, enum: [
            // program
            ScenarioProgrammActionTypes.SWITCH,
            // common
            ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
            ScenarioCommonActionTypes.VISIBLE_BY_STORE,
            // intro
            ScenarioIntroActionTypes.DURATION,
            // product
            ScenarioProductActionTypes.UP_LIMIT,
            ScenarioProductActionTypes.DOWN_LIMIT,
            ScenarioProductActionTypes.ADDITIONAL_PRICE,
            ScenarioProductActionTypes.FIXED_PRICE,
            // selector
            ScenarioSelectorActionTypes.MAX_USAGE,
            ScenarioSelectorActionTypes.DEFAULT_PRODUCTS,
        ],
        required: true,
    },
    value: { type: Schema.Types.Mixed, required: false },
    extra: { type: Schema.Types.Mixed, required: false },
});

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
    extra: { type: Schema.Types.Mixed, required: false },
});

const NodeModel = mongoose.model<INode>("Node", NodeSchema);

export { NodeModel, INode, IScenario };
