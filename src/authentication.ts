import * as config from "./config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as got from "got";
import { IAuthRequest, IJWTBody } from "./interfaces";

async function createProxyRequestToAuthServer(client: string, token?: string): Promise<any> {
  let r: got.Response<any>;
  try {
    r = await got.get(`${config.LIC_SERVER_HOST}/api/v1/clients/${client}`, {
      headers: {
        "content-type": "application/json",
        "x-authorization": token || config.AUTH_LIC_SERVER_API_KEY,
      },
    });
  } catch (err) {
    let authServerResp: any;
    if (err instanceof got.HTTPError && err.statusCode === 500) {
      try {
        authServerResp = JSON.parse(err.body as string);
      } catch (err1) {
        throw Error(`Proxy request to the auth server fail. Error: ${err1}`);
      }
    }
    throw Error(!!authServerResp && !!authServerResp.error && !!authServerResp.error.length
      ?
      authServerResp.error[0].message
      :
      `Proxy request to the auth server fail. Error: ${err}`
    );
  }

  let body: any;
  try {
    body = JSON.parse(r.body)
  } catch (err) {
    throw Error(`Response body from auth server bad format. Error: ${err}`);
  }
  return body;
}

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scopes?: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const token = request.headers["x-authorization"] ? String(request.headers["x-authorization"]) : undefined;
  if (securityName === "clientToken") {

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided."));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, config.AUTH_PRIVATE_KEY, function (err: any, decoded: IJWTBody) {
        if (err) {
          reject(err);
        } else {
          createProxyRequestToAuthServer(decoded.userId, token)
            .then(res => {
              (request as IAuthRequest).client = res.data;
              resolve();
            }).catch(err => {
              reject(err);
            });
          // Check if JWT contains all required scopes
          /*for (const scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error("JWT does not contain required scope."));
            }
          }*/
        }
      });
    });
  } else if (securityName === "serverToken") {
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided."));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, config.AUTH_CLIENT_PRIVATE_KEY, function (err: any, decoded: IJWTBody) {
        if (err) {
          reject(err);
        } else {
          createProxyRequestToAuthServer(decoded.userId)
            .then(res => {
              (request as IAuthRequest).client = res.data;
              resolve();
            }).catch(err => {
              reject(err);
            });
        }
      });
    });
  }
}