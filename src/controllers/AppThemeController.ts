import { Controller, Route, Get, Tags, OperationId, Example, Security, Request, Query, Put, Body } from "tsoa";
import { IAppTheme, IRef, RefTypes, TerminalTypes } from "@djonnyx/tornado-types";
import { AppThemeModel } from "../models";
import { IAuthRequest } from "../interfaces";
import { findAllWithFilter } from "../utils/requestOptions";
import { getRef, riseRefVersion } from "../db/refs";
import { formatAppThemeModel } from "../utils/appTheme";

export interface IAppThemeItem extends IAppTheme { }

interface IAppThemeMeta {
    ref: IRef;
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

const RESPONSE_TEMPLATE: IAppThemeItem = {
    id: "g434r34r-34r23-4t32-34215",
    client: "f234r34r-34r23-4t32-43434",
    type: TerminalTypes.KIOSK,
    name: "light",
    version: 1,
    lastUpdate: new Date(),
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

@Route("/app-themes")
@Tags("AppTheme")
export class AppThemesController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetAll")
    @Example<IAppThemesResponse>({
        meta: META_TEMPLATE,
        data: [RESPONSE_TEMPLATE],
    })
    public async getAll(@Request() request: IAuthRequest, @Query() type: TerminalTypes): Promise<IAppThemesResponse> {
        try {
            const items = await findAllWithFilter(AppThemeModel.find({ client: request.account.id, type }), request);

            const ref = await getRef(request.account.id, RefTypes.THEMES, {
                "extra.type.equals": Number(type),
            });
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
    @Get("{name}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("GetOne")
    @Example<IAppThemeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE
    })
    public async getOne(name: string, @Request() request: IAuthRequest, @Query() type: TerminalTypes): Promise<IAppThemeResponse> {
        try {
            const item = await AppThemeModel.findOne({ name, type, client: request.account.id });

            const ref = await getRef(request.account.id, RefTypes.THEMES, {
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

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("terminalAccessToken")
    @OperationId("Update")
    @Example<IAppThemeResponse>({
        meta: META_TEMPLATE,
        data: RESPONSE_TEMPLATE,
    })
    public async update(id: string, @Body() body: IAppThemeUpdateRequest, @Request() request: IAuthRequest): Promise<IAppThemeResponse> {
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

                const ref = await riseRefVersion(request.account.id, RefTypes.THEMES, {
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
}