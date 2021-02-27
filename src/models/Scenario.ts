import {
    ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioProductActionTypes,
    ScenarioProgrammActionTypes, ScenarioSelectorActionTypes
} from "@djonnyx/tornado-types";
import { Schema } from "mongoose";

export const ScenarioSchema = new Schema({
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
            ScenarioSelectorActionTypes.MIN_USAGE,
            ScenarioSelectorActionTypes.DEFAULT_PRODUCTS,
        ],
        required: true,
    },
    value: { type: Schema.Types.Mixed, required: false },
    extra: { type: Schema.Types.Mixed, required: false },
});