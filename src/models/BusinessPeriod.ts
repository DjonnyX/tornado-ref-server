import { IBusinessPeriodContents } from "@djonnyx/tornado-types";
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { IScheduleItem } from "../controllers/BusinessPeriodsController";

interface IScheduleDocument extends Document, IScheduleItem {}

interface IBusinessPeriodDocument extends Document {
    client: string;
    active: boolean;
    name: string,
    contents: IBusinessPeriodContents;
    schedule: Array<IScheduleDocument>;
    extra?: { [key: string]: any } | null;
}

const TimeRangeSchema = new Schema({
    start: { type: Schema.Types.Number, required: true },
    end: { type: Schema.Types.Number, required: false },
});

const ScheduleSchema = new Schema({
    active: { type: Schema.Types.Boolean, required: true },
    time: TimeRangeSchema,
    description: { type: String, required: false },
    weekDays: [{ type: Schema.Types.Number }],
    extra: { type: Schema.Types.Mixed, required: false },
});

const BusinessPeriodSchema = new Schema({
    client: { type: String, required: true, index: { unique: false } },
    active: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: String, required: false },
    contents: { type: Schema.Types.Mixed, default: {} },
    schedule: [ScheduleSchema],
    extra: { type: Schema.Types.Mixed, required: false, default: {} },
});

const BusinessPeriodModel = mongoose.model<IBusinessPeriodDocument>("BusinessPeriod", BusinessPeriodSchema);

export { BusinessPeriodModel, IBusinessPeriodDocument, IScheduleDocument };
