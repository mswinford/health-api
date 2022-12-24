import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { JwksClient, RsaSigningKey } from "jwks-rsa";
import {
  verify as jwtVerify,
  JwtHeader,
  SigningKeyCallback,
} from "jsonwebtoken";

const getKeyCallback =
  (jwksClient: JwksClient) =>
  (header: JwtHeader, callback: SigningKeyCallback) => {
    jwksClient.getSigningKey(header.kid, (_, key: RsaSigningKey) => {
      var signingKey = key.getPublicKey() || key.rsaPublicKey;
      callback(null, signingKey);
    });
  };

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const token = req.headers["Authorization"].split(" ")[1];

  const jwks = new JwksClient({
    jwksUri: "https://swinford-house-dev.us.auth0.com/.well-known/jwks.json",
  });

  jwtVerify(token, getKeyCallback(jwks), {
    audience: "http://swinford.house/api/health-api",
  });

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

export default httpTrigger;
