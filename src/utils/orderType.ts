import { IOrderType } from "@djonnyx/tornado-types";
import { IOrderTypeDocument } from "@models";

export const formatOrderTypeModel = (model: IOrderTypeDocument): IOrderType => ({
    id: model._id,
    isDefault: model.isDefault,
    active: model.active,
    contents: model.contents,
    extra: model.extra,
});
