import { RefModel, IRef, RefTypes } from "../models/index";
import { Controller, Route, Get, Tags, OperationId, Example, Security } from "tsoa";

export interface IRefItem {
    name: string;
    version: number;
    lastupdate: Date;
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

const date = new Date();

const RESPONSE_TEMPLATE: Array<IRefItem> = [
    {
        name: RefTypes.USERS,
        version: 1,
        lastupdate: date,
    }, {
        name: RefTypes.ROLES,
        version: 2,
        lastupdate: date,
    }, {
        name: RefTypes.NODES,
        version: 1,
        lastupdate: date,
    }, {
        name: RefTypes.PRODUCTS,
        version: 3,
        lastupdate: date,
    }, {
        name: RefTypes.SELECTORS,
        version: 4,
        lastupdate: date,
    }, {
        name: RefTypes.TAGS,
        version: 5,
        lastupdate: date,
    }, {
        name: RefTypes.BUSINESS_PERIODS,
        version: 3,
        lastupdate: date,
    }, {
        name: RefTypes.ADS,
        version: 3,
        lastupdate: date,
    }
];

const RESPONSE_SINGLE_TEMPLATE: IRefItem = {
    name: RefTypes.PRODUCTS,
    version: 1,
    lastupdate: date,
};

const formatModel = (model: IRef): IRefItem => ({
    name: model.name,
    version: model.version,
    lastupdate: model.lastupdate
});

@Route("/refs")
@Tags("Ref")
export class RefsController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
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
}

@Route("/ref")
@Tags("Ref")
export class RefController extends Controller {
    @Get("{name}")
    @Security("jwt")
    @Security("apiKey")
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