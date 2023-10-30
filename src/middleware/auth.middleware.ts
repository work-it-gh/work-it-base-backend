import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../util/jwt.util";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: "FAIL",
      message: "authorization header should be provided",
    });
  }

  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({
      status: "FAIL",
      message: "authentication token is required",
    });
  }

  const decoded = verifyToken(token);

  if (decoded instanceof Error) {
    return res.status(400).json({
      status: "FAIL",
      message: decoded.message,
    });
  }

  req.user = decoded;
  next();
};
