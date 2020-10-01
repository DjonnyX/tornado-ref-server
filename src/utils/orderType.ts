import { IOrderType } from "@models";

export const formatOrderTypeModel = (model: IOrderType) => ({
    id: model._id,
    isDefault: model.isDefault,
    active: model.active,
    contents: model.contents,
    extra: model.extra,
});
