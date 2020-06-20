import { TarifModel, ITarif } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";

interface ITarifItem {
    id: string;
    name: string;
    description?: string;
    price: number;
}

interface ITarifsMeta {
    ref: {
        name: string;
        version: number;
        lastUpdate: number;
    };
}

interface TarifsResponse {
    meta: ITarifsMeta;
    data: Array<ITarifItem>;
}

interface TarifResponse {
    meta: ITarifsMeta;
    data?: ITarifItem;
}

interface TarifCreateRequest {
    name: string;
    description?: string;
    price: number;
}

const RESPONSE_TEMPLATE: ITarifItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    name: "Morning Tarif",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 15000
};

const formatModel = (model: ITarif) => ({
    id: model._id,
    name: model.name,
    description: model.description,
    price: model.price
});

const META_TEMPLATE: ITarifsMeta = {
    ref: {
        name: "tarifs",
        version: 1,
        lastUpdate: 1589885721
    }
};

@Route("/tarifs")
@Tags("Tarif")
export class TarifController extends Controller {
    @Get()
    @OperationId("GetAll")
    @Example<TarifsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(): Promise<TarifsResponse> {
        try {
            const items = await TarifModel.find({});
            const ref = await getRef("tarifs");
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
    @Example<TarifResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string): Promise<TarifResponse> {
        try {
            const item = await TarifModel.findById(id);
            const ref = await getRef("tarifs");
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
    @Example<TarifResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async create(@Body() request: TarifCreateRequest): Promise<TarifResponse> {
        try {
            const item = new TarifModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion("tarifs");
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
    @Example<TarifResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async update(id: string, @Body() request: TarifCreateRequest): Promise<TarifResponse> {
        try {
            const item = await TarifModel.findOneAndUpdate({ id }, request);
            const ref = await riseRefVersion("tarifs");
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
    @Example<TarifResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string): Promise<TarifResponse> {
        try {
            await TarifModel.findOneAndDelete({ id });
            const ref = await riseRefVersion("tarifs");
            return {
                meta: { ref }};
        } catch (err) {
            this.setStatus(500);
            console.error("Caught error", err);
        }
    }
}