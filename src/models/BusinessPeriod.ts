import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface ISchedule {
    time?: {
        start: number;
        end?: number;
    },
    weekDays?: number[],
}

interface IBusinessPeriod extends Document {
    name: string;
    description?: string;
    schedule: Array<ISchedule>;
}

const TimeRangeSchema = new Schema({
    start: { type: Schema.Types.Number, required: true },
    end: { type: Schema.Types.Number, required: false },
});

const ScheduleSchema = new Schema({
    time: TimeRangeSchema,
    description: { type: String, required: false },
    weekDays: [{ type: Schema.Types.Number }],
});

const BusinessPeriodSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    schedule: [ScheduleSchema],
});

const BusinessPeriodModel = mongoose.model<IBusinessPeriod>("BusinessPeriod", BusinessPeriodSchema);

export { BusinessPeriodModel, IBusinessPeriod, ISchedule };
