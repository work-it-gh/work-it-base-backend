import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { IJwtPayload } from "../../types";
import { config } from "../config";

const JWT_SECRET = config.JWT_SECRET;

export const verifyToken: (token: string) => IJwtPayload | Error = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload as IJwtPayload;
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return new Error(
        `${(err as JsonWebTokenError).name}: ${
          (err as JsonWebTokenError).message
        }`
      );
    }
    return new Error(err as string);
  }
};

export const generateToken = (payload: IJwtPayload) => {
  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};
