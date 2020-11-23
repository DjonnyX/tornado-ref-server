import * as config from "./config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { IAuthRequest, IJWTBody } from "./interfaces";
import { licServerApiService } from "./services";

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

    return new Promise((resolve, reject) => {
      if (!token || token === "") {
        reject(new Error("No token provided."));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, config.AUTH_PRIVATE_KEY, function (err: any, decoded: IJWTBody) {
        if (err) {
          return reject(err);
        }

        if (!decoded.userId || !decoded.email) {
          return reject(new Error("Access token bad format."))
        }
        (request as IAuthRequest).client = {
          id: decoded.userId,
          email: decoded.email,
        };
        (request as IAuthRequest).token = token;
        return resolve();
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
          return reject(err);
        }

        licServerApiService.verifyLicenseKey(token, { clientToken: token })
          .then(res => {
            (request as IAuthRequest).client = res.data;
            (request as IAuthRequest).token = token;
            resolve();
          }).catch(err => {
            reject(err);
          });
      });
    });
  }
}