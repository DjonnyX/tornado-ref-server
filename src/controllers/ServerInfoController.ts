import { Controller, Route, Get, Tags, OperationId, Example, Security, Request } from "tsoa";
import { IRefServerInfo } from "@djonnyx/tornado-types";
import { IAuthRequest } from "../interfaces";
import { getClientId } from "../utils/account";
import { formatServerInfoModel } from "../utils/serverInfo";
import { ServerInfoModel } from "../models";

interface IServerInfoItem extends IRefServerInfo { }

interface IServerInfoMeta { }

interface IServerInfoResponse {
    meta?: IServerInfoMeta;
    data?: IServerInfoItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

const RESPONSE_TEMPLATE: IServerInfoItem = {
    backup: {
        name: "my/backup/file.tdb",
        size: 12124200,
        lastCreate: new Date(),
    }
};

const META_TEMPLATE: IServerInfoMeta = {};

@Route("/info")
@Tags("ServerInfo")
export class ServerInfoController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<IServerInfoResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async get(@Request() request: IAuthRequest): Promise<IServerInfoResponse> {
        const client = getClientId(request);

        try {
            const item = await ServerInfoModel.findOne({ client });
            return {
                meta: {},
                data: formatServerInfoModel(item),
            };
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Get server info error. ${err}`,
                    }
                ]
            };
        }
    }
}