import { RefTypes, ITerminal, TerminalModel } from "../models";
import { Controller, Route, Get, Tags, OperationId, Example, Security, Put, Body, Delete, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatTerminalModel } from "../utils/terminal";
import { IRefItem } from "./RefsController";
import { TerminalTypes, TerminalStatusTypes } from "../models/enums";
import { IAuthRequest } from "../interfaces";

interface ITerminalItem extends ITerminal {
    id?: string;
}

interface ITerminalMeta {
    ref: IRefItem;
}

interface ITerminalsResponse {
    meta?: ITerminalMeta;
    data?: Array<ITerminalItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ITerminalResponse {
    meta?: ITerminalMeta;
    data?: ITerminalItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

/*interface ITerminalCreateRequest {
    active?: boolean;
    name: string;
    address: string | null;
    terminals: Array<string> | null;
    employes: Array<string> | null;
    extra?: { [key: string]: any } | null;
}*/

interface ITerminalUpdateRequest {
    active?: boolean;
    name?: string;
    address?: string;
    terminals: Array<string> | null;
    employes: Array<string> | null;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ITerminalItem = {
    status: TerminalStatusTypes.ONLINE,
    type: TerminalTypes.KIOSK,
    name: "My terminal",
    store: "My store 1",
    lastwork: new Date(),
    extra: {
        key: "value",
    }
};

const META_TEMPLATE: ITerminalMeta = {
    ref: {
        name: RefTypes.TERMINALS,
        version: 1,
        lastupdate: new Date(),
    }
};

@Route("/terminals")
@Tags("Terminal")
export class TerminalsController extends Controller {
    @Get()
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetAll")
    @Example<ITerminalsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<ITerminalsResponse> {
        try {
            const items = await TerminalModel.find({ $client: request.client });
            const ref = await getRef(request.client, RefTypes.TERMINALS);
            return {
                meta: { ref },
                data: items.map(v => formatTerminalModel(v))
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

@Route("/terminal")
@Tags("Terminal")
export class TerminalController extends Controller {
    @Get("{id}")
    @Security("jwt")
    @Security("apiKey")
    @OperationId("GetOne")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<ITerminalResponse> {
        try {
            const item = await TerminalModel.findById(id);
            const ref = await getRef(request.client, RefTypes.TERMINALS);
            return {
                meta: { ref },
                data: formatTerminalModel(item),
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

    /*@Post()
    @Security("jwt")
    @OperationId("Create")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() request: ITerminalCreateRequest): Promise<ITerminalResponse> {
        try {
            const item = new TerminalModel(request);
            const savedItem = await item.save();
            const ref = await riseRefVersion(RefTypes.TERMINALS);
            return {
                meta: { ref },
                data: formatTerminalModel(savedItem),
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
    }*/

    @Put("{id}")
    @Security("jwt")
    @OperationId("Update")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: ITerminalUpdateRequest, @Request() request: IAuthRequest): Promise<ITerminalResponse> {
        try {
            const item = await TerminalModel.findById(id);

            for (const key in body) {
                item[key] = body[key];
                if (key === "extra") {
                    item.markModified(key);
                }
            }

            await item.save();

            const ref = await riseRefVersion(request.client, RefTypes.TERMINALS);
            return {
                meta: { ref },
                data: formatTerminalModel(item),
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

    @Delete("{id}")
    @Security("jwt")
    @OperationId("Delete")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<ITerminalResponse> {
        let bp: ITerminal;
        try {
            bp = await TerminalModel.findByIdAndDelete(id);
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

        try {
            const ref = await riseRefVersion(request.client, RefTypes.TERMINALS);
            return {
                meta: { ref },
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