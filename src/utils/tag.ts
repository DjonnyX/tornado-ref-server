import { ITag } from "@models";

export const formatTagModel = (model: ITag) => ({
    id: model._id,
    active: model.active,
    contents: model.contents,
    extra: model.extra,
});
