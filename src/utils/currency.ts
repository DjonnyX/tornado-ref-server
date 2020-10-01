import { ICurrency } from "@models";

export const formatCurrencyModel = (model: ICurrency) => ({
    id: model._id,
    isDefault: model.isDefault,
    active: model.active,
    code: model.code,
    name: model.name,
    symbol: model.symbol,
    extra: model.extra,
});