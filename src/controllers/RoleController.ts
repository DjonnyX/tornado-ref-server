import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { licServerApiService } from "../services";
import { IAuthRequest } from "../interfaces";
import { DefaultRoleTypes, IRef, IRole, RefTypes, UserRights } from "@djonnyx/tornado-types";
import express = require("express");
import { IRefDocument } from "@models";

interface IRoleInfo extends IRole { }

interface ICreateRoleParams {
    name: DefaultRoleTypes | string;
    description?: string;
    rights?: Array<UserRights>;
    extra?: {
        [key: string]: any;
    } | null;
}

interface IUpdateRoleParams {
    name?: string;
    description?: string;
    rights?: Array<UserRights>;
    extra?: {
        [key: string]: any;
    } | null;
}

interface RolesGetResponse {
    meta?: IRoleInfoMeta;
    data?: Array<IRoleInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface RoleResponse {
    meta?: IRoleInfoMeta;
    data?: IRoleInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IRoleInfoMeta {
    ref: IRef;
}

export const ROLE_RESPONSE_TEMPLATE: IRole = {
    id: "507c7f79bcf86cd7994f6c0e",
    name: "Waiter",
    description: "A waiter account.",
    rights: [
        UserRights.CREATE_LICENSE,
        UserRights.UPDATE_LICENSE,
        UserRights.DELETE_LICENSE,
    ],
    extra: {
        "key": "value",
    },
};

const META_TEMPLATE: IRoleInfoMeta = {
    ref: {
        name: RefTypes.ROLES,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/roles")
@Tags("Role")
export class RolesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @OperationId("GetAll")
    @Example<RolesGetResponse>({
        meta: META_TEMPLATE,
        data: [ROLE_RESPONSE_TEMPLATE],
    })
    public async getRoles(@Request() request: IAuthRequest): Promise<RolesGetResponse> {
        return await licServerApiService.getRoles(request.query, { clientToken: request.token });
    }
}

@Route("/role")
@Tags("Role")
export class RoleController extends Controller {
    @Get("{name}")
    @Security("clientAccessToken")
    @OperationId("GetOne")
    @Example<RoleResponse>({
        meta: META_TEMPLATE,
        data: ROLE_RESPONSE_TEMPLATE,
    })
    public async getRole(name: string, @Request() request: IAuthRequest): Promise<RoleResponse> {
        return await licServerApiService.getRole(name, { clientToken: request.token });
    }

    @Post()
    @Security("clientAccessToken")
    @OperationId("Create")
    @Example<RoleResponse>({
        meta: META_TEMPLATE,
        data: ROLE_RESPONSE_TEMPLATE,
    })
    public async createRole(@Body() body: ICreateRoleParams, @Request() request: IAuthRequest): Promise<RoleResponse> {
        return await licServerApiService.createRole(body as any, { clientToken: request.token });
    }

    @Put("{name}")
    @Security("clientAccessToken")
    @OperationId("Update")
    @Example<RoleResponse>({
        meta: META_TEMPLATE,
        data: ROLE_RESPONSE_TEMPLATE,
    })
    public async updateRole(name: string, @Body() body: IUpdateRoleParams, @Request() request: IAuthRequest): Promise<RoleResponse> {
        return await licServerApiService.updateRole(name, body, { clientToken: request.token });
    }

    @Delete("{name}")
    @Security("clientAccessToken")
    @OperationId("Delete")
    @Example<RoleResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteRole(name: string, @Request() request: IAuthRequest): Promise<RoleResponse> {
        return await licServerApiService.deleteRole(name, { clientToken: request.token });
    }
}
