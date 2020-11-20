import * as config from "./config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as got from "got";
import { IAuthRequest, IJWTBody } from "./interfaces";

async function getClienInfo(client: string): Promise<any> {
  let r: got.Response<any>;
  let headers = {
    "content-type": "application/json",
    "x-access-token": config.AUTH_LIC_SERVER_API_KEY,
  };

  try {
    r = await got.get(`${config.LIC_SERVER_HOST}/api/v1/clients/${client}`, {
      headers,
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
  if (securityName === "clientAccessToken") {
    const token = request.headers["authorization"] ? String(request.headers["authorization"]) : undefined;

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided."));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, config.AUTH_PRIVATE_KEY, function (err: any, decoded: IJWTBody) {
        if (err) {
          reject(err);
        } else {
          getClienInfo(decoded.userId)
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
  } else if (securityName === "accessToken") {
    const token = request.headers["x-access-token"] ? String(request.headers["x-access-token"]) : undefined;
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided."));
      }
      // Вовке я bearer передаю от ключа
      // проверку тут не надо делать её проверит lic-server отдельным запросом проверки ключа
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, config.AUTH_CLIENT_PRIVATE_KEY, function (err: any, decoded: IJWTBody) {
        if (err) {
          reject(err);
        } else {
          getClienInfo(decoded.userId)
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