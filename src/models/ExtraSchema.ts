import { Schema } from "mongoose";

export const ExtraSchema = new Schema({
    key: { type: Schema.Types.String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
});