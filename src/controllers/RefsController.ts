import { RefModel, IRef, RefTypes } from "../models/index";
import { Controller, Route, Get, Tags, OperationId, Example, Security } from "tsoa";

export interface IRefItem {
    name: string;
    version: number;
    lastUpdate: number;
}

interface RefsResponse {
    data?: Array<IRefItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface RefResponse {
    data?: IRefItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

const RESPONSE_TEMPLATE: Array<IRefItem> = [
    {
        name: RefTypes.USERS,
        version: 1,
        lastUpdate: 1589885721
    }, {
        name: RefTypes.ROLES,
        version: 2,
        lastUpdate: 1589885721
    }, {
        name: RefTypes.NODES,
        version: 1,
        lastUpdate: 1589885721
    }, {
        name: RefTypes.PRODUCTS,
        version: 3,
        lastUpdate: 1589885721
    }, {
        name: RefTypes.SELECTORS,
        version: 4,
        lastUpdate: 1589885721
    }, {
        name: RefTypes.TAGS,
        version: 5,
        lastUpdate: 1589885721
    }
];

const RESPONSE_SINGLE_TEMPLATE: IRefItem = {
    name: RefTypes.PRODUCTS,
    version: 1,
    lastUpdate: 1589885721
};

const formatModel = (model: IRef): IRefItem => ({
    name: model.name,
    version: model.version,
    lastUpdate: model.lastUpdate
});

@Route("/refs")
@Tags("Ref")
export class RefController extends Controller {
    @Get()
    @Security("jwt")
    @OperationId("GetAll")
    @Example<RefsResponse>({
        data: RESPONSE_TEMPLATE
    })
    public async getAll(): Promise<RefsResponse> {
        try {
            const items = await RefModel.find({});
            return {
                data: items.map(v => formatModel(v))
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Caught error. ${err}`,
                    }
                ]
            };
        }
    }

    @Get("{name}")
    @Security("jwt")
    @OperationId("GetOne")
    @Example<RefResponse>({
        data: RESPONSE_SINGLE_TEMPLATE
    })
    public async getOne(name: string): Promise<RefResponse> {
        try {
            const item = await RefModel.findOne({ name });
            return {
                data: formatModel(item)
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Caught error. ${err}`,
                    }
                ]
            };
        }
    }
}