import * as config from "./config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { IAuthRequest, IClientJWTBody } from "./interfaces";

const checkClientToken = async (token: string, request: express.Request) => {
  return new Promise((resolve, reject) => {
    console.log(token)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, config.AUTH_PRIVATE_KEY, async function (err: any, decoded: IClientJWTBody) {
      console.log(err, decoded)
      if (err) {
        return reject(err);
      }

      if (!decoded.id || !decoded.email) {
        return reject(new Error("Client access token bad format."))
      }

      (request as IAuthRequest).client = {
        id: decoded.id,
        email: decoded.email,
      };
      (request as IAuthRequest).token = token;

      return resolve(decoded);
    });
  });
}

const checkApiKey = async (apikey: string, request: express.Request) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(apikey, config.AUTH_APIKEY_PRIVATE_KEY, async function (err: any, decoded: IClientJWTBody) {
      if (err) {
        return reject(err);
      }

      if (!decoded.id || !decoded.email) {
        if (request.method === "POST" && request.path === "/api/v1/terminal/register") {
          // allow
        } else {
          return reject(new Error("apikey bad format."));
        }
      }

      (request as IAuthRequest).client = {
        id: decoded.id,
        email: decoded.email,
      };
      (request as IAuthRequest).token = apikey;

      return resolve(decoded);
    });
  });
}

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scopes?: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  console.log(securityName)
  if (securityName === "clientAccessToken") {
    const authorization = request.headers["authorization"] ? String(request.headers["authorization"]) : undefined;
    let token = authorization ? authorization.replace("Bearer ", "") : undefined;

    if (!!token) {
      return await checkClientToken(token, request);
    }
  }

  if (securityName === "accessToken") {
    const token = request.headers["x-access-token"] ? String(request.headers["x-access-token"]) : undefined;

    if (!!token) {
      return await checkApiKey(token, request);
    }
  }
}