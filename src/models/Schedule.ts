import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

enum Days {
    M,
    TU,
    W,
    TH,
    F,
    SA,
    SU
}

interface ITime {
    start?: number;
    end?: number;
}

interface IPeriod {
    start?: number;
    end?: number;
    days: Array<Days>;
    times: Array<ITime>;
}

interface ISchedule extends Document {
    name: string;
    description?: string;
    period: Array<IPeriod>;
    tarif: Schema.Types.ObjectId;
}

const ScheduleSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    period: { type: Object },
    tarif: { type: Schema.Types.ObjectId, required: true }
});

const ScheduleModel = mongoose.model<ISchedule>("Schedule", ScheduleSchema);

export { ScheduleModel, ISchedule, IPeriod, Days };
