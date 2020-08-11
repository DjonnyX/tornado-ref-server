import { IOrderType } from "@models";

export const formatOrderTypeModel = (model: IOrderType) => ({
    id: model._id,
    active: model.active,
    name: model.name,
    description: model.description,
    color: model.color,
    assets: model.assets,
    images: model.images || {
        main: null,
        icon: null,
    },
    extra: model.extra,
});
