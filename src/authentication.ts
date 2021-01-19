import * as config from "./config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { IAuthRequest, IClientJWTBody, ITerminalJWTBody } from "./interfaces";
import { ICheckLicenseResponse, licServerApiService } from "./services";
import { extractError } from "./utils/error";

const checkClientToken = async (token: string, request: express.Request) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, config.AUTH_PRIVATE_KEY, async function (err: any, decoded: IClientJWTBody) {
      if (err) {
        return reject(err);
      }

      if (!decoded.id || !decoded.email) {
        return reject(new Error("Client access token bad format."))
      }

      (request as IAuthRequest).client = {
        id: decoded.id,
      };
      (request as IAuthRequest).token = token;

      return resolve(decoded);
    });
  });
}

const checkApiKey = async (apikey: string, request: express.Request) => {
  return new Promise(async (resolve, reject) => {
    const payload = jwt.decode(apikey, {
      json: true,
    }) as ITerminalJWTBody;

    if (!payload.imei || !payload.key) {
      return reject(new Error("apikey bad format."));
    }

    jwt.verify(apikey, `${config.AUTH_APIKEY_PRIVATE_KEY_SALT}${payload.serial}`, async function (err: any, decoded: ITerminalJWTBody) {
      if (err) {
        return reject(err);
      }

      if (request.path === "/api/v1/terminal/registration" && request.method === "POST") {
        // allow
      } else {
        let licenseResponse: ICheckLicenseResponse;
        try {
          licenseResponse = await licServerApiService.checkLicense(apikey);

          const err = extractError(licenseResponse.error);
          if (!!err) {
            throw new Error(err);
          }
        } catch (err) {
          return reject(new Error(`Check license error. ${err}`));
        }

        (request as IAuthRequest).terminal = {
          license: licenseResponse.data,
          imei: payload.imei,
          key: payload.key,
        };
        (request as IAuthRequest).client = {
          id: licenseResponse.data.clientId,
        };
      }
      (request as IAuthRequest).token = apikey;

      return resolve(payload);
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
    const authorization = request.headers["authorization"] ? String(request.headers["authorization"]) : undefined;
    let token = authorization ? authorization.replace("Bearer ", "") : undefined;

    if (!!token) {
      return await checkClientToken(token, request);
    }
  }

  if (securityName === "terminalAccessToken") {
    const token = request.headers["x-access-token"] ? String(request.headers["x-access-token"]) : undefined;

    if (!!token) {
      return await checkApiKey(token, request);
    }
  }
}