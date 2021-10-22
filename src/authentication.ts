import * as config from "./config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { IAuthRequest, IBaseResponse, IClientJWTBody, IIntegrationJWTBody, ITerminalJWTBody } from "./interfaces";
import { ICheckLicenseResponse, licServerApiService } from "./services";
import { ErrorCodes, ServerError } from "./error";
import { IIntegration, TerminalStatusTypes } from "@djonnyx/tornado-types";
import { TerminalModel } from "./models";

const checkClientToken = async (token: string, request: express.Request) => {
  return new Promise<void>((resolve, reject) => {
    if (!token) {
      return reject(new ServerError("Token is empty.", ErrorCodes.CLIENT_TOKEN_EMPTY_TOKEN, 401));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, config.AUTH_PRIVATE_KEY, async function (err: any, decoded: IClientJWTBody) {
      if (err) {
        return reject(new ServerError(err.message, ErrorCodes.CLIENT_TOKEN_VERIFICATION, 401));
      }

      if (!decoded.id || !decoded.email) {
        return reject(new ServerError(err.message, ErrorCodes.CLIENT_TOKEN_BAD_FORMAT, 401));
      }

      (request as IAuthRequest).account = {
        id: decoded.id,
        owner: decoded.owner,
      };
      (request as IAuthRequest).token = token;

      return resolve();
    });
  });
}

const checkIntegrationToken = async (token: string, request: express.Request) => {
  return new Promise<void>((resolve, reject) => {
    if (!token) {
      return reject(new ServerError("Token is empty.", ErrorCodes.INTEGRATION_TOKEN_EMPTY_TOKEN, 401));
    }

    try {
      const payload = jwt.decode(token, {
        json: true,
      }) as {
        integrationId: string;
        serverName: string;
      };

      if (!payload?.integrationId) {
        throw Error("token paiload is fail.");
      }

      licServerApiService.getIntegration<IBaseResponse<IIntegration, {}>>(payload.integrationId, request, {
        query: {
          secure: "true",
        },
      }).then(res => {
        const integration = res?.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jwt.verify(token, integration.verificationKey, async function (err: any, decoded: IIntegrationJWTBody) {
          if (err) {
            return reject(new ServerError(err.message, ErrorCodes.INTEGRATION_TOKEN_VERIFICATION, 401));
          }

          if (!decoded.integrationId || !decoded.serverName) {
            return reject(new ServerError("Integration token bad format", ErrorCodes.INTEGRATION_TOKEN_VERIFICATION, 401));
          }

          (request as IAuthRequest).account = {
            id: request.query.clientId as string,
            owner: request.query.clientOwner as string,
          };
          (request as IAuthRequest).integration = decoded;
          (request as IAuthRequest).token = token;
          return resolve();
        });
      }).catch(err => {
        return reject(new ServerError(err.message, ErrorCodes.INTEGRATION_TOKEN_VERIFICATION, 401));
      });
    } catch (err) {
      return reject(new ServerError(err.message, ErrorCodes.INTEGRATION_TOKEN_VERIFICATION, 401));
    }
  });
}

const checkApiKey = async (apikey: string, request: express.Request) => {
  return new Promise<void>(async (resolve, reject) => {
    if (!apikey) {
      return reject(new ServerError("Token is empty.", ErrorCodes.TERMINAL_TOKEN_EMPTY_TOKEN, 401));
    }
    const payload = jwt.decode(apikey, {
      json: true,
    }) as ITerminalJWTBody;

    if (!payload.imei || !payload.hash) {
      return reject(new ServerError("Token bad format.", ErrorCodes.TERMINAL_TOKEN_BAD_FORMAT, 401));
    }

    let licenseResponse: ICheckLicenseResponse;
    try {
      licenseResponse = await licServerApiService.checkLicense(apikey, request);

      if (ServerError.isServerError(licenseResponse.error)) {
        throw ServerError.from(licenseResponse.error);
      }
    } catch (err) {
      if (ServerError.isServerError(err)) {
        throw ServerError.from(err);
      }

      return reject(new ServerError(`Check license error. ${err}`, ErrorCodes.TERMINAL_TOKEN_CHECK_LICENSE_ERROR, 401));
    }

    try {
      const device = await TerminalModel.findOne({ imei: payload.imei });
      if (device) {
        device.lastwork = new Date();
        device.status = TerminalStatusTypes.ONLINE;
        await device.save();
      }
    } catch (err) {
      // etc
    }

    (request as IAuthRequest).terminal = {
      license: licenseResponse.data,
      type: payload.type,
      imei: payload.imei,
      key: payload.hash,
    };

    (request as IAuthRequest).account = {
      id: licenseResponse.data.client,
      owner: licenseResponse.data.client,
    };

    (request as IAuthRequest).token = apikey;

    return resolve();
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
    return await checkClientToken(token, request);
  } else if (securityName === "integrationAccessToken") {
    const authorization = request.headers["authorization"] ? String(request.headers["authorization"]) : undefined;
    let token = authorization ? authorization.replace("Bearer ", "") : undefined;
    return await checkIntegrationToken(token, request);
  } else if (securityName === "terminalAccessToken") {
    const token = request.headers["x-access-token"] ? String(request.headers["x-access-token"]) : undefined;
    return await checkApiKey(token, request);
  }
}