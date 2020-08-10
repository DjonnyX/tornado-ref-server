import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ISchedule {
    active: boolean;
    time?: {
        start: number;
        end?: number;
    },
    weekDays?: number[];
    extra?: { [key: string]: any } | null;
}

interface IBusinessPeriod extends Document {
    active: boolean;
    name: string;
    description?: string;
    schedule: Array<ISchedule>;
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
    active: { type: Schema.Types.Boolean, required: true, default: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    schedule: [ScheduleSchema],
    extra: { type: Schema.Types.Mixed, required: false },
});

const BusinessPeriodModel = mongoose.model<IBusinessPeriod>("BusinessPeriod", BusinessPeriodSchema);

export { BusinessPeriodModel, IBusinessPeriod, ISchedule };
