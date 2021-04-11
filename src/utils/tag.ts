import { ITag } from "@djonnyx/tornado-types";
import { ITagDocument } from "../models/Tag";

export const formatTagModel = (model: ITagDocument): ITag => ({
    id: model._id,
    active: model.active,
    contents: model.contents,
    extra: model.extra,
});
