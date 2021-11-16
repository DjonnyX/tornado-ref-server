import { IWeightUnit } from "@djonnyx/tornado-types";
import { IWeightUnitDocument } from "../models";

export const formatWeightUnitModel = (model: IWeightUnitDocument): IWeightUnit => ({
    id: model._id,
    systemName: model.systemName,
    contents: model.contents,
    extra: model.extra,
});
