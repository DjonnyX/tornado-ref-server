import {
    ScenarioCommonActionTypes, ScenarioIntroActionTypes, ScenarioPriceActionTypes, ScenarioProductActionTypes,
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
            ScenarioCommonActionTypes.VISIBLE_BY_ORDER_TYPE,
            ScenarioCommonActionTypes.VISIBLE_BY_STORE,
            ScenarioCommonActionTypes.VISIBLE_BY_TERMINAL,
            // intro
            ScenarioIntroActionTypes.DURATION,
            // price
            ScenarioPriceActionTypes.ADDITIONAL_PRICE,
            ScenarioPriceActionTypes.FIXED_PRICE,
            ScenarioPriceActionTypes.ADDITIONAL_PRICE_BY_BUSINESS_PERIOD,
            ScenarioPriceActionTypes.FIXED_PRICE_BY_BUSINESS_PERIOD,
            ScenarioPriceActionTypes.ADDITIONAL_PRICE_BY_ORDER_TYPE,
            ScenarioPriceActionTypes.FIXED_PRICE_BY_ORDER_TYPE,
            // product
            ScenarioProductActionTypes.UP_LIMIT,
            ScenarioProductActionTypes.DOWN_LIMIT,
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