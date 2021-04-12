import { IBusinessPeriodDocument, IScheduleDocument } from "@models";
import { IBusinessPeriodItem } from "../controllers/BusinessPeriodsController";

const formatSchedule = (model: Array<IScheduleDocument>) => {
    if (!model) {
        return [];
    }

    return model.map(schedule => {
        return {
            active: schedule.active,
            time: {
                end: schedule.time.end || 0,
                start: schedule.time.start || 0,
            },
            weekDays: schedule.weekDays || [],
            extra: schedule.extra,
        }
    });
}

export const formatModel = (model: IBusinessPeriodDocument): IBusinessPeriodItem => ({
    id: model._id,
    active: model.active,
    contents: model.contents,
    schedule: formatSchedule(model.schedule),
    extra: model.extra,
});