import { IBusinessPeriod, ISchedule } from "@models";

const formatSchedule = (model: Array<ISchedule>) => {
    if (!model) {
        return [];
    }

    return model.map(schedule => {
        return {
            time: {
                end: schedule.time.end || 0,
                start: schedule.time.start || 0,
            },
            weekDays: schedule.weekDays || [],
        }
    });
}

export const formatModel = (model: IBusinessPeriod) => ({
    id: model._id,
    name: model.name,
    description: model.description,
    schedule: formatSchedule(model.schedule),
});