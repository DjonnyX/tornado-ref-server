import * as config from "./config";
import * as express from "express";
import * as jwt from "jsonwebtoken";

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scopes?: string[],
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (securityName === "jwt") {
    const token = request.headers["authorization"] ? String(request.headers["authorization"]) : undefined;

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided."));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, config.AUTH_PRIVATE_KEY, function(err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          // Check if JWT contains all required scopes
          /*for (const scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error("JWT does not contain required scope."));
            }
          }*/
          resolve(decoded);
        }
      });
    });
  } else if (securityName === "apiKey") {
    const apiKey = request.headers["x-auth-token"] ? String(request.headers["x-auth-token"]) : undefined;

    return new Promise((resolve, reject) => {
      if (!apiKey) {
        reject(new Error("No apiKey provided."));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(apiKey, config.AUTH_CLIENT_PRIVATE_KEY, function(err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          // Check if JWT contains all required scopes
          /*for (const scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error("JWT does not contain required scope."));
            }
          }*/
          console.log(decoded)
          //(request as any).client = decoded.id
          resolve(decoded);
        }
      });
    });
  }
}