import { ISystemTag } from "@djonnyx/tornado-types";
import { ISystemTagDocument } from "../models/SystemTag";

export const formatSystemTagModel = (model: ISystemTagDocument): ISystemTag => ({
    id: model._id,
    name: model.name,
    extra: model.extra,
});
