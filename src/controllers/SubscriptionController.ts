import { Controller, Route, Post, Tags, Example, Request, Body, Get, Put, Delete, OperationId, Security } from "tsoa";
import { IAuthRequest, IBaseResponse } from "../interfaces";
import { licServerApiService } from "../services";
import { ISubscription, RefTypes, IRef, SubscriptionStatuses } from "@djonnyx/tornado-types";
import { TARIF_RESPONSE_TEMPLATE } from "./TarifsController";
import { ACCOUNT_RESPONSE_TEMPLATE } from "./AccountController";

interface ISubscriptionInfo extends ISubscription { }

export interface ICreateSubscriptionParams {
    client: string;
    tarifId: string;
    status: SubscriptionStatuses;
    devices: number;
    createdDate: Date;
    expiredDate: Date;
    extra?: {
        [key: string]: any;
    } | null;
}

export interface IUpdateSubscriptionParams {
    client?: string;
    // tarifId?: string;
    status?: SubscriptionStatuses;
    devices?: number;
    // createdDate: Date;
    expiredDate?: Date;
    extra?: {
        [key: string]: any;
    } | null;
}

interface SubscriptionsResponse {
    meta?: ISubscriptionInfoMeta;
    data?: Array<ISubscriptionInfo>;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface SubscriptionResponse {
    meta?: ISubscriptionInfoMeta;
    data?: ISubscriptionInfo;
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface SubscriptionDeleteResponse {
    meta?: ISubscriptionInfoMeta;
    data?: {};
    error?: Array<{
        code: number;
        message: string;
    }>;
}

interface ISubscriptionInfoMeta {
    ref: IRef;
}

export const SUBSCRIPTION_RESPONSE_TEMPLATE: ISubscriptionInfo = {
    id: "507c7f79bcf86cd7994f6c0e",
    client: ACCOUNT_RESPONSE_TEMPLATE?.id,
    tarifId: TARIF_RESPONSE_TEMPLATE?.id,
    tarif: TARIF_RESPONSE_TEMPLATE,
    status: SubscriptionStatuses.ACTIVATED,
    devices: 3,
    createdDate: new Date(),
    expiredDate: new Date(),
    extra: { key: "value" },
};

const META_TEMPLATE: ISubscriptionInfoMeta = {
    ref: {
        name: RefTypes.SUBSCRIPTIONS,
        version: 1,
        lastUpdate: new Date(),
    }
};

@Route("/subscriptions")
@Tags("Subscription")
export class SubscriptionsController extends Controller {
    @Get()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetAll")
    @Example<SubscriptionsResponse>({
        meta: META_TEMPLATE,
        data: [SUBSCRIPTION_RESPONSE_TEMPLATE],
    })
    public async getSubscriptions(@Request() request: IAuthRequest): Promise<SubscriptionsResponse> {
        let response: IBaseResponse<Array<ISubscription>, ISubscriptionInfoMeta>;
        try {
            response = await licServerApiService.getSubscriptions(request);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `getSubscriptions fail. ${err}`,
                    }
                ]
            };
        }

        return response;
    }

    @Get("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("GetOne")
    @Example<SubscriptionResponse>({
        meta: META_TEMPLATE,
        data: SUBSCRIPTION_RESPONSE_TEMPLATE,
    })
    public async getSubscription(id: string, @Request() request: IAuthRequest): Promise<SubscriptionResponse> {
        let response: IBaseResponse<ISubscription, ISubscriptionInfoMeta>;
        try {
            response = await licServerApiService.getSubscription(id, request);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `getSubscriptions fail. ${err}`,
                    }
                ]
            };
        }

        return response;
    }

    @Post()
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Create")
    @Example<SubscriptionResponse>({
        meta: META_TEMPLATE,
        data: SUBSCRIPTION_RESPONSE_TEMPLATE,
    })
    public async createSubscription(@Body() body: ICreateSubscriptionParams, @Request() request: IAuthRequest): Promise<SubscriptionResponse> {
        let response: IBaseResponse<ISubscription, ISubscriptionInfoMeta>;
        try {
            response = await licServerApiService.createSubscription(body, request);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `createSubscription fail. ${err}`,
                    }
                ]
            };
        }

        return response;
    }

    @Put("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Update")
    @Example<SubscriptionResponse>({
        meta: META_TEMPLATE,
        data: SUBSCRIPTION_RESPONSE_TEMPLATE,
    })
    public async updateSubscription(id: string, @Body() body: IUpdateSubscriptionParams, @Request() request: IAuthRequest): Promise<SubscriptionResponse> {
        let response: IBaseResponse<ISubscription, ISubscriptionInfoMeta>;
        try {
            response = await licServerApiService.updateSubscription(id, body, request);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `updateSubscriptions fail. ${err}`,
                    }
                ]
            };
        }

        return response;
    }

    @Delete("{id}")
    @Security("clientAccessToken")
    @Security("integrationAccessToken")
    @OperationId("Delete")
    @Example<SubscriptionDeleteResponse>({
        meta: META_TEMPLATE,
    })
    public async deleteSubscription(id: string, @Request() request: IAuthRequest): Promise<SubscriptionDeleteResponse> {
        let response: IBaseResponse<{}, ISubscriptionInfoMeta>;
        try {
            response = await licServerApiService.deleteSubscription(id, request);
        } catch (err) {
            this.setStatus(500);
            return {
                error: [
                    {
                        code: 500,
                        message: `deleteSubscriptions fail. ${err}`,
                    }
                ]
            };
        }

        return response;
    }
}
