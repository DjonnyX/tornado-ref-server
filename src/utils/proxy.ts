import { Controller } from "tsoa";
import * as got from "got";
import * as express from "express";
import * as config from "../config";
import { ServerError } from "../error";

export async function makeRequest<T = any>(request: got.GotPromise<any>): Promise<T> {
    let r: got.Response<any>;

    try {
        r = await request;
    } catch (err) {
        let authServerResp: any;
        if (err instanceof got.HTTPError) {
            if (err.statusCode === 500) {
                try {
                    authServerResp = JSON.parse(err.body as string);
                } catch (err1) {
                    throw Error(err1);
                }
            } else if (err.statusCode === 401) {
                throw ServerError.from(err.body);
            }
        }
        throw Error(!!authServerResp && !!authServerResp.error && !!authServerResp.error.length
            ?
            authServerResp.error[0].message
            :
            err
        );
    }

    let body: any;
    try {
        body = JSON.parse(r.body)
    } catch (err) {
        throw Error(`Response body from auth server bad format. Error: ${err}`);
    }
    return body as T;
}

export async function createProxyRequestToAuthServer<R = any>(context: Controller, request: express.Request): Promise<R> {
    let r: got.Response<any>;
    const headers = {
        "content-type": "application/json",
        "x-access-token": config.AUTH_LIC_SERVER_API_KEY,
    };

    try {
        switch (request.method) {
            case "GET": {
                r = await got.get(`${config.LIC_SERVER_HOST}${request.originalUrl}`, {
                    headers,
                    query: request.query,
                });
                break;
            }
            case "POST": {
                r = await got.post(`${config.LIC_SERVER_HOST}${request.originalUrl}`, {
                    headers,
                    query: request.query,
                    body: JSON.stringify(request.body),
                });
                break;
            }
            case "PUT": {
                r = await got.put(`${config.LIC_SERVER_HOST}${request.originalUrl}`, {
                    headers,
                    query: request.query,
                    body: JSON.stringify(request.body),
                });
                break;
            }
            case "DELETE": {
                r = await got.delete(`${config.LIC_SERVER_HOST}${request.originalUrl}`, {
                    headers,
                    query: request.query,
                });
                break;
            }
        }
    } catch (err) {
        context.setStatus(500);

        if (err instanceof got.HTTPError && err.statusCode === 500) {
            let authServerResp: any;
            try {
                authServerResp = JSON.parse(err.body as string);
            } catch (err1) {
                return {
                    error: [
                        {
                            code: 500,
                            message: `Proxy request to the auth server fail. Error: ${err1}`,
                        }
                    ]
                } as any;
            }
            return authServerResp;
        }
        return {
            error: [
                {
                    code: 500,
                    message: `Proxy request to the auth server fail. Error: ${err}`,
                }
            ]
        } as any;
    }

    let body: any;
    try {
        body = JSON.parse(r.body)
    } catch (err) {
        return {
            error: [
                {
                    code: 500,
                    message: `Response body from auth server bad format. Error: ${err}`,
                }
            ]
        } as any;
    }
    return body;
}