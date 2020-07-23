import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { NodeTypes, ScenarioIntroActionTypes, ScenarioCommonActionTypes, ScenarioProductActionTypes, ScenarioSelectorActionTypes } from "./enums";
import { ExtraSchema } from "./ExtraSchema";

interface IScenario {
    name: string;
    action: ScenarioIntroActionTypes | ScenarioCommonActionTypes;
    value?: any;
    extra?: { [key: string]: any };
}

interface INode extends Document {
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
}

const ScenarioSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    action: {
        type: Schema.Types.String, enum: [
            // common
            ScenarioCommonActionTypes.VISIBLE_BY_BUSINESS_PERIOD,
            ScenarioCommonActionTypes.VISIBLE_BY_POINT_OF_SALE,
            // intro
            ScenarioIntroActionTypes.DURATION,
            // product
            ScenarioProductActionTypes.UP_LIMIT,
            ScenarioProductActionTypes.DOWN_LIMIT,
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
});

const NodeModel = mongoose.model<INode>("Node", NodeSchema);

export { NodeModel, INode, IScenario };
