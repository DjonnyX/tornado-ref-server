import { Controller, Route, Get, Tags, OperationId, Example, Security, Request, Query, Put, Body, Post, Delete } from "tsoa";
import { IAppTheme, IRef, KioskThemeResourceTypes, RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
import { AppThemeModel, IAppThemeDocument, ITerminalDocument, TerminalModel } from "../models";
import { IAuthRequest } from "../interfaces";
import { getRef, riseRefVersion } from "../db/refs";
import { formatAppThemeModel } from "../utils/appTheme";
import { readFileJSONAsync } from "../utils/file";
import { getClientId } from "../utils/account";
import { findAllWithFilter } from "../utils/requestOptions";
import { ACCOUNT_RESPONSE_TEMPLATE } from "./AccountController";
import { ASSET_RESPONSE_TEMPLATE } from "./AssetsController";

export interface IAppThemeItem extends IAppTheme { }

interface IAppThemeMeta {
    ref: IRef;
}

interface IAppThemeCreateRequest {
    name: string;
}

interface IAppThemeUpdateRequest {
    name?: string;
    data?: any;
}

interface IAppThemesResponse {
    meta?: IAppThemeMeta;
    data?: Array<IAppThemeItem>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface IAppThemeResponse {
    meta?: IAppThemeMeta;
    data?: IAppThemeItem;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

export const RESPONSE_TEMPLATE: IAppThemeItem = {
    id: "g434r34r-34r23-4t32-34215",
    isDefault: true,
    client: ACCOUNT_RESPONSE_TEMPLATE?.id,
    type: TerminalTypes.KIOSK,
    name: "light",
    version: 1,
    lastUpdate: new Date(),
    assets: [ASSET_RESPONSE_TEMPLATE?.id],
    resources: { [KioskThemeResourceTypes.AUTH__BACKGROUND_COLOR]: ASSET_RESPONSE_TEMPLATE?.id },
    data: {
        "skinedElement": {
            "skinedProp": "some-value",
        }
    },
}

const META_TEMPLATE: IAppThemeMeta = {
    ref: {
        name: RefTypes.THEMES,
        version: 1,
        lastUpdate: new Date(),
    }
};

const getThemePathByTerminalType = (type: TerminalTypes): string => {
    let name: string;
    switch (type) {
        case TerminalTypes.KIOSK:
            name = "kiosk";
            break;
        case TerminalTypes.EQUEUE:
            name = "eq";
            break;
        case TerminalTypes.ORDER_PICKER:
            name = "order-picker";
            break;
    }

    return `template/themes/${name}.json`;
}

@Route("/app-themes")
@Tags("AppTheme")
export class AppThemesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<IAppThemesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest): Promise<IAppThemesResponse> {
        const client = getClientId(request);

        try {
            const items: Array<IAppThemeDocument> = await findAllWithFilter(AppThemeModel.find({ client }), request);

            const type = request.query.type;

            const refOptions = type !== undefined ? {
                "extra.theme.equals": Number(type),
            } : {};
            const ref = await getRef(client, RefTypes.THEMES, refOptions);
        
            return {
                meta: { ref },
                data: items.map(v => formatAppThemeModel(v))
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

@Route("/app-theme")
@Tags("AppTheme")
export class AppThemeController extends Controller {
    @Get("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<IAppThemeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(id: string, @Request() request: IAuthRequest): Promise<IAppThemeResponse> {
        const client = getClientId(request);

        try {
            const item = await AppThemeModel.findOne({ _id: id, client });

            const ref = await getRef(client, RefTypes.THEMES, {
                "extra.type.equals": item.type,
            });
            return {
                meta: { ref },
                data: formatAppThemeModel(item)
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
    @Example<IAppThemeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async create(@Body() body: IAppThemeCreateRequest, @Query() type: TerminalTypes, @Request() request: IAuthRequest): Promise<IAppThemeResponse> {
        const client = getClientId(request);

        let themeData: any;
        try {
            const template = await readFileJSONAsync(getThemePathByTerminalType(type));

            for (const themeName in template) {
                themeData = template[themeName].data;
                break;
            }
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Read theme template. ${err}`,
                    }
                ]
            };
        }

        try {
            const item = new AppThemeModel({
                ...body,
                data: themeData,
                type,
                client,
                lastUpdate: new Date(),
                version: 1,
            });
            const savedItem = await item.save();
            const ref = await riseRefVersion(client, RefTypes.THEMES, {
                "extra.type.equals": item.type,
            });
            return {
                meta: { ref },
                data: formatAppThemeModel(savedItem),
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
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<IAppThemeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IAppThemeUpdateRequest, @Request() request: IAuthRequest): Promise<IAppThemeResponse> {
        const client = getClientId(request);

        try {
            const item = await AppThemeModel.findById(id);

            if (!!item) {
                item.version = (Number(item.version) || 1) + 1;
                item.lastUpdate = new Date(Date.now());

                for (const key in body) {
                    item[key] = body[key];
                    if (key === "data") {
                        item.markModified(key);
                    }
                }

                await item.save();

                const ref = await riseRefVersion(client, RefTypes.THEMES, {
                    "extra.type.equals": item.type,
                });
                return {
                    meta: { ref },
                    data: formatAppThemeModel(item),
                };
            } else {
                this.setStatus(500);
                return {
                    error: [
                        {
                            code: 500,
                            message: "Theme not found.",
                        }
                    ]
                };
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
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<IAppThemeResponse>({
        meta: META_TEMPLATE
    })
    public async delete(id: string, @Request() request: IAuthRequest): Promise<IAppThemeResponse> {
        const client = getClientId(request);

        let theme: IAppThemeDocument;
        try {
            theme = await AppThemeModel.findByIdAndDelete(id);
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

        let defaultTheme: IAppThemeDocument;
        try {
            defaultTheme = await AppThemeModel.findOne({ client, type: theme.type, name: "light" });
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

        let terminals: Array<ITerminalDocument>;
        try {
            terminals = await TerminalModel.find({ client: client, type: theme.type });
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Terminals not found. ${err}`,
                    }
                ]
            };
        }

        try {
            const promises = new Array<Promise<ITerminalDocument>>();
            for (const terminal of terminals) {
                if (terminal.config.theme === String(theme._id)) {
                    terminal.config.theme = String(defaultTheme._id);
                    terminal.markModified("config");
                    promises.push(terminal.save());
                }
            }
            await Promise.all(promises);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `Set default theme fail. ${err}`,
                    }
                ]
            };
        }

        try {
            const ref = await riseRefVersion(client, RefTypes.THEMES, {
                "extra.type.equals": theme.type,
            });
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
