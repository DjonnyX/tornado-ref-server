import { IRef, RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
import { RefModel, IRefDocument } from "../models/index";
import { Controller, Route, Get, Tags, OperationId, Example, Security, Request, Query } from "tsoa";
import { IAuthRequest } from "../interfaces";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";

interface RefsResponse {
    data?: Array<IRef>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface RefResponse {
    data?: IRef;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

const date = new Date();

const RESPONSE_TEMPLATE: Array<IRef> = [
    {
        name: RefTypes.NODES,
        version: 1,
        lastUpdate: date,
    }, {
        name: RefTypes.PRODUCTS,
        version: 3,
        lastUpdate: date,
    }, {
        name: RefTypes.SELECTORS,
        version: 4,
        lastUpdate: date,
    }, {
        name: RefTypes.TAGS,
        version: 5,
        lastUpdate: date,
    }, {
        name: RefTypes.BUSINESS_PERIODS,
        version: 3,
        lastUpdate: date,
    }, {
        name: RefTypes.ADS,
        version: 3,
        lastUpdate: date,
    }
];

const RESPONSE_SINGLE_TEMPLATE: IRef = {
    name: RefTypes.PRODUCTS,
    version: 1,
    lastUpdate: date,
};

const formatModel = (model: IRefDocument): IRef => ({
    name: model.name,
    version: model.version,
    lastUpdate: model.lastUpdate
});

@Route("/refs")
@Tags("Ref")
export class RefsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<RefsResponse>({
        data: RESPONSE_TEMPLATE
    })
    public async getAll(@Request() request: IAuthRequest, @Query() theme?: TerminalTypes): Promise<RefsResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(RefModel.find({ client }), request) as Array<IRefDocument>;
            return {
                data: items.filter(v => v.name !== RefTypes.THEMES || Number(v.extra?.type) === Number(theme)).map(v => formatModel(v))
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
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<RefResponse>({
        data: RESPONSE_SINGLE_TEMPLATE
    })
    public async getOne(name: string, @Request() request: IAuthRequest): Promise<RefResponse> {
        const client = getClientId(request);

        try {
            const item = await RefModel.findOne({ name, client });
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