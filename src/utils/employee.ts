import { IEmployee } from "@djonnyx/tornado-types";
import { IEmployeeDocument } from "@models";

export const formatEmployeeModel = (model: IEmployeeDocument): IEmployee => ({
    id: model._id,
    active: model.active,
    name: model.name,
    devices: model.devices,
    extra: model.extra,
});