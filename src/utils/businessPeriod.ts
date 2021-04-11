import { IBusinessPeriod, ISchedule } from "@djonnyx/tornado-types";
import { IBusinessPeriodDocument } from "@models";

const formatSchedule = (model: Array<ISchedule>) => {
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
        }
    });
}

export const formatModel = (model: IBusinessPeriodDocument): IBusinessPeriod => ({
    id: model._id,
    active: model.active,
    contents: model.contents,
    schedule: formatSchedule(model.schedule),
    extra: model.extra,
});