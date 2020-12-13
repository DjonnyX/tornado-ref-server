import { RefTypes, TerminalModel } from "../models";
import { Controller, Route, Get, Tags, OperationId, Example, Security, Put, Body, Delete, Request, Post } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatTerminalModel } from "../utils/terminal";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";
import { ILicense, ITerminal, TerminalStatusTypes, TerminalTypes } from "@djonnyx/tornado-types";
import { licServerApiService } from "../services";

interface ITerminalItem extends ITerminal { }

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

interface ITerminalCreateRequest {
    active?: boolean;
    name: string;
    address: string | null;
    terminals: Array<string> | null;
    employes: Array<string> | null;
    extra?: { [key: string]: any } | null;
}

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
        lastUpdate: new Date(),
    }
};

@Route("/terminals")
@Tags("Terminal")
export class TerminalsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("accessToken")
    @OperationId("GetAll")
    @Example<ITerminalsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<ITerminalsResponse> {
        try {
            const items = await TerminalModel.find({ client: request.client.id });
            const ref = await getRef(request.client.id, RefTypes.TERMINALS);
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
    @Security("clientAccessToken")
    @Security("accessToken")
    @OperationId("GetOne")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<ITerminalResponse> {
        try {
            const item = await TerminalModel.findById(id);
            const ref = await getRef(request.client.id, RefTypes.TERMINALS);
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

    @Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: ITerminalCreateRequest, @Request() request: IAuthRequest): Promise<ITerminalResponse> {
        // create terminal
        let license: ILicense;
        try {
            license = await licServerApiService.verifyLicenseKey(request.token);
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
            const item = new TerminalModel(body);
            const savedItem = await item.save();
            const ref = await riseRefVersion(license.userId, RefTypes.TERMINALS);
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
    }

    /*@Put("{id}")
    @Security("clientAccessToken")
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

            const ref = await riseRefVersion(request.client.id, RefTypes.TERMINALS);
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
    @Security("clientAccessToken")
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
            const ref = await riseRefVersion(request.client.id, RefTypes.TERMINALS);
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
    }*/
}