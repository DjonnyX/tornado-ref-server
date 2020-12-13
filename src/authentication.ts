import * as config from "./config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { IAuthRequest, IJWTBody } from "./interfaces";
import { licServerApiService } from "./services";

const checkClientToken = async (token: string, request: express.Request) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error("No token provided."));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, config.AUTH_PRIVATE_KEY, async function (err: any, decoded: IJWTBody) {
      if (err) {
        return reject(err);
      }

      if (!decoded.userId || !decoded.email) {
        return reject(new Error("Client access token bad format."))
      }

      (request as IAuthRequest).client = {
        id: decoded.userId,
        email: decoded.email,
      };
      (request as IAuthRequest).token = token;

      return resolve();
    });
  });
}

const checkApiKey = async (apikey: string, request: express.Request) => {
  return new Promise((resolve, reject) => {
    if (!apikey) {
      reject(new Error("No apikey provided."));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(apikey, config.AUTH_APIKEY_PRIVATE_KEY, async function (err: any, decoded: IJWTBody) {
      if (err) {
        return reject(err);
      }

      if (!decoded.userId || !decoded.email) {
        if (request.method === "POST" && request.path === "/api/v0/apikey/register") {
          // allow
        } else {
          return reject(new Error("apikey bad format."));
        }
      }

      (request as IAuthRequest).client = {
        id: decoded.userId,
        email: decoded.email,
      };
      (request as IAuthRequest).token = apikey;

      return resolve();
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
  if (securityName === "clientAccessToken") {
    const authorization = (request.headers["authorization"] ? String(request.headers["authorization"]) : undefined) || "";
    let token = authorization.replace("Bearer ", "");

    return await checkClientToken(token, request);
  } else if (securityName === "accessToken") {
    const token = request.headers["x-access-token"] ? String(request.headers["x-access-token"]) : undefined;
    
    return await checkApiKey(token, request);
  }
}