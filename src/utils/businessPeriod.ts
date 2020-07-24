import { IBusinessPeriod } from "@models";

export const formatModel = (model: IBusinessPeriod) => ({
    id: model._id,
    name: model.name,
    description: model.description,
    schedule: model.schedule,
});