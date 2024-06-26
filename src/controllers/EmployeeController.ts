import { EmployeeModel, IEmployeeDocument } from "../models/index";
import { Controller, Route, Get, Post, Put, Delete, Tags, OperationId, Example, Body, Security, Request } from "tsoa";
import { getRef, riseRefVersion } from "../db/refs";
import { formatEmployeeModel } from "../utils/employee";
import { IAuthRequest } from "../interfaces";
import { IEmployee, IRef, RefTypes } from "@djonnyx/tornado-types";
import { findAllWithFilter } from "../utils/requestOptions";
import { getClientId } from "../utils/account";
import { TERMINAL_RESPONSE_TEMPLATE } from "./TerminalController";

interface IEmployeeItem extends IEmployee { }

interface IEmployeeMeta {
    ref: IRef;
}

interface EmployeesResponse {
    meta?: IEmployeeMeta;
    data?: Array<IEmployeeItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface EmployeeResponse {
    meta?: IEmployeeMeta;
    data?: IEmployeeItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface EmployeeCreateRequest {
    active?: boolean;
    name: string;
    devices?: Array<string>;
    extra?: { [key: string]: any } | null;
}

interface EmployeeUpdateRequest {
    active?: boolean;
    name?: string;
    devices?: Array<string>;
    extra?: { [key: string]: any } | null;
}

export const EMPLOYEE_RESPONSE_TEMPLATE: IEmployeeItem = {
    id: "507c7f79bcf86cd7994f6c0e",
    active: true,
    name: "Backuper",
    devices: [TERMINAL_RESPONSE_TEMPLATE?.id],
    extra: { key: "value" },
};

const META_TEMPLATE: IEmployeeMeta = {
    ref: {
        name: RefTypes.EMPLOYEES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/employees")
@Tags("Employee")
export class EmployeesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<EmployeesResponse>({
        meta: META_TEMPLATE,
        data: [EMPLOYEE_RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<EmployeesResponse> {
        const client = getClientId(request);

        try {
            const items = await findAllWithFilter(EmployeeModel.find({ client }), request);
            const ref = await getRef(client, RefTypes.EMPLOYEES);
            return {
                meta: { ref },
                data: items.map(v => formatEmployeeModel(v)),
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

@Route("/employee")
@Tags("Employee")
export class EmployeeController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<EmployeeResponse>({
        meta: META_TEMPLATE,
        data: EMPLOYEE_RESPONSE_TEMPLATE,
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<EmployeeResponse> {
        const client = getClientId(request);

        try {
            const item = await EmployeeModel.findById(id);
            const ref = await getRef(client, RefTypes.EMPLOYEES);
            return {
                meta: { ref },
                data: formatEmployeeModel(item),
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
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<EmployeeResponse>({
        meta: META_TEMPLATE,
        data: EMPLOYEE_RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: EmployeeCreateRequest, @Request() request: IAuthRequest): Promise<EmployeeResponse> {
        const client = getClientId(request);

        let employes: Array<IEmployee>;

        try {
            employes = await EmployeeModel.find({ client });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get employes error. ${err}`,
                    }
                ]
            };
        }

        try {
            const item = new EmployeeModel({ ...body, client });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.EMPLOYEES);
            return {
                meta: { ref },
                data: formatEmployeeModel(savedItem),
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
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<EmployeeResponse>({
        meta: META_TEMPLATE,
        data: EMPLOYEE_RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: EmployeeUpdateRequest, @Request() request: IAuthRequest): Promise<EmployeeResponse> {
        const client = getClientId(request);

        let item: IEmployeeDocument;

        try {
            item = await EmployeeModel.findById(id);

            for (const key in body) {
                if (key === "extra") {
                    item.extra = { ...item.extra, ...body[key] };
                    item.markModified(key);
                } else {
                    item[key] = body[key];
                }
            }
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
            await item.save();

            const ref = await riseRefVersion(client, RefTypes.EMPLOYEES);
            return {
                meta: { ref },
                data: formatEmployeeModel(item),
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
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<EmployeeResponse>({
        meta: META_TEMPLATE,
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<EmployeeResponse> {
        const client = getClientId(request);

        let employes: Array<IEmployee>;
        try {
            employes = await EmployeeModel.find({ client });
        } catch (err) { }

        if (employes && employes.length === 1) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: "There must be at least one currency left.",
                    }
                ]
            };
        }

        try {
            await EmployeeModel.findOneAndDelete({ _id: id });
            const ref = await riseRefVersion(client, RefTypes.EMPLOYEES);
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