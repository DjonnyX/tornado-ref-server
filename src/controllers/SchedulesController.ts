import { ScheduleModel, ISchedule, IPeriod } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";

interface IScheduleItem {
    id: string;
    name: string;
    description?: string;
    period: Array<IPeriod>;
}

interface ISchedulesMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface SchedulesResponse {
    meta: ISchedulesMeta;
    data: Array<IScheduleItem>;
}

interface ScheduleResponse {
    meta: ISchedulesMeta;
    data?: IScheduleItem;
}

interface ScheduleCreateRequest {
    name: string;
    description?: string;
    period: Array<IPeriod>;
}

const RESPONSE_TEMPLATE: IScheduleItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    name: "Morning schedule",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    period: [{
        start: 1589830619,
        end: 1589850000,
        days: [0, 4],
        times: [{ start: 1589830619, end: 1589850000 }]
    }]
};

const formatModel = (model: ISchedule) => ({
    id: model._id,
    name: model.name,
    description: model.description,
    period: model.period
});

const META_TEMPLATE: ISchedulesMeta = {
    ref: {
        name: "schedules",
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/schedules")
@Tags("Schedule")
export class SchedulesController extends Controller {
    @Get()
    @OperationId("GetAll")
    @Example<SchedulesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<SchedulesResponse> {
        try {
            const items = await ScheduleModel.find({});
            const ref = await getRef("schedules");
            return {
                meta: { ref },
                data: items.map(v => formatModel(v))
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }

    @Get("{id}")
    @OperationId("GetOne")
    @Example<ScheduleResponse>({
        meta: {
            ref: {
                name: "schedules",
                version: 1,
                lastUpdate: 1589885721
            }
        },
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string): Promise<ScheduleResponse> {
        try {
            const item = await ScheduleModel.findById(id);
            const ref = await getRef("schedules");
            return {
                meta: { ref },
                data: formatModel(item)
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }

    @Post()
    @OperationId("Create")
    @Example<ScheduleResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() request: ScheduleCreateRequest): Promise<ScheduleResponse> {
        try {
            const item = new ScheduleModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion("schedules");
            return {
                meta: { ref },
                data: formatModel(savedItem)
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }

    @Put("{id}")
    @OperationId("Update")
    @Example<ScheduleResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() request: ScheduleCreateRequest): Promise<ScheduleResponse> {
        try {
            const item = await ScheduleModel.findOneAndUpdate({ id }, request);
            const ref = await riseRefVersion("schedules");
            return {
                meta: { ref },
                data: formatModel(item)
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }

    @Delete("{id}")
    @OperationId("Delete")
    @Example<ScheduleResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<ScheduleResponse> {
        try {
            await ScheduleModel.findOneAndDelete({ id });
            const ref = await riseRefVersion("schedules");
            return {
                meta: { ref }
            };
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }
}