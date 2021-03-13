import { ITerminalDocument, TerminalModel } from "../models";
import { Controller, Route, Get, Tags, OperationId, Example, Security, Put, Body, Delete, Request, Post } from "tsoa";
import { ITerminal, TerminalStatusTypes, TerminalTypes, RefTypes } from "@djonnyx/tornado-types";
import { getRef, riseRefVersion } from "../db/refs";
import { formatTerminalModel } from "../utils/terminal";
import { IRefItem } from "./RefsController";
import { IAuthRequest } from "../interfaces";
import { ISetDeviceResponse, licServerApiService } from "../services";
import { extractError } from "../utils/error";
import { findAllWithFilter } from "../utils/requestOptions";

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

interface ITerminalRegisterRequest {
    name?: string;
    type?: TerminalTypes;
}

interface ITerminalUpdateRequest {
    name?: string;
    storeId?: string;
    extra?: { [key: string]: any } | null;
}

const RESPONSE_TEMPLATE: ITerminalItem = {
    clientId: "f234r34r-34r23-4t32-43434",
    status: TerminalStatusTypes.ONLINE,
    type: TerminalTypes.KIOSK,
    name: "My terminal",
    storeId: "g234r34r-34r23-4t32-43434",
    lastwork: new Date(),
    imei: "00001-000000000034",
    licenseId: "34r34r-34r23-4t32-43434",
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


@Route("/device")
@Tags("Terminal")
export class Deviceontroller extends Controller {
    @Get("license-verify")
    @Security("terminalAccessToken")
    @OperationId("LicenseVerify")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async licenseVerify(@Request() request: IAuthRequest): Promise<ITerminalResponse> {
        let terminal: ITerminalDocument;
        try {
            terminal = await TerminalModel.findOne({
                imei: request.terminal.imei,
                licenseId: request.terminal.license.id,
            });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Terminal not found. ${err}`,
                    }
                ]
            };
        }

        const ref = await getRef(request.account.id, RefTypes.TERMINALS);
        return {
            meta: { ref },
            data: formatTerminalModel(terminal),
        };
    }

    @Post("registration")
    @Security("terminalAccessToken")
    @OperationId("Registration")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async registration(@Body() body: ITerminalRegisterRequest, @Request() request: IAuthRequest): Promise<ITerminalResponse> {
        let setDeviceResponse: ISetDeviceResponse;
        try {
            setDeviceResponse = await licServerApiService.setDevice(request.token);

            const err = extractError(setDeviceResponse.error);
            if (!!err) {
                throw new Error(err);
            }
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Set device error. ${err}`,
                    }
                ]
            };
        }

        let existsTerminal: ITerminalDocument;
        try {
            existsTerminal = await TerminalModel.findOne({ imei: setDeviceResponse.data.imei });
        } catch (err) { }

        if (!!existsTerminal) {
            existsTerminal.clientId = setDeviceResponse.data.clientId;
            existsTerminal.status = TerminalStatusTypes.ONLINE;
            existsTerminal.type = request.terminal.type;
            existsTerminal.name = body.name;
            existsTerminal.lastwork = new Date(Date.now());
            existsTerminal.licenseId = setDeviceResponse.data.id;

            try {
                const savedItem = await existsTerminal.save();
                const ref = await riseRefVersion(setDeviceResponse.data.clientId, RefTypes.TERMINALS);
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
                            message: `Terminal update failed. ${err}`,
                        }
                    ]
                };
            }
        }

        try {
            const item = new TerminalModel({
                clientId: setDeviceResponse.data.clientId,
                status: TerminalStatusTypes.ONLINE,
                type: body.type,
                name: body.name,
                lastwork: new Date(Date.now()),
                imei: setDeviceResponse.data.imei,
                licenseId: setDeviceResponse.data.id,
                extra: {},
            });
            const savedItem = await item.save();
            const ref = await riseRefVersion(setDeviceResponse.data.clientId, RefTypes.TERMINALS);
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
}

@Route("/terminals")
@Tags("Terminal")
export class TerminalsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<ITerminalsResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE]
    })
    public async getAll(@Request() request: IAuthRequest): Promise<ITerminalsResponse> {
        let findParams: any = request.terminal ? {} : { clientId: request.account.id };

        try {
            const items = await findAllWithFilter(TerminalModel.find(findParams), request);
            const ref = await getRef(request.account.id, RefTypes.TERMINALS);
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
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<ITerminalResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<ITerminalResponse> {
        try {
            const item = await TerminalModel.findById(id);
            const ref = await getRef(request.account.id, RefTypes.TERMINALS);
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

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
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

            const ref = await riseRefVersion(request.account.id, RefTypes.TERMINALS);
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

    /*@Delete("{id}")
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
            const ref = await riseRefVersion(request.account.id, RefTypes.TERMINALS);
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