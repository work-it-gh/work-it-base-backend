import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util";
import { IJwtPayload } from "../../types";
import { UserModel } from "../models";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: "failure",
      message: "authorization header should be provided",
    });
  }

  const authToken = authHeader.split("Bearer ")[1];
  if (!authToken) {
    return res.status(401).json({
      status: "failure",
      message: "authentication token should be provided",
    });
  }

  const decodedPayload = verifyToken(authToken);

  if (decodedPayload instanceof Error) {
    return res.status(401).json({
      status: "failure",
      message: decodedPayload.message,
    });
  }

  req.user = decodedPayload;
  next();
};

export const accountExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, email, phoneNumber } = req.user as IJwtPayload;

  const user = await UserModel.findOne({
    $or: [
      { _id: id, email },
      { _id: id, phoneNumber },
    ],
  });

  if (!user) {
    return res.status(404).json({
      status: "failure",
      message: "user does not exist",
    });
  }

  next();
};

export const userIsClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, email, phoneNumber } = req.user as IJwtPayload;

  const user = await UserModel.findOne({
    $or: [
      { _id: id, email },
      { _id: id, phoneNumber },
    ],
  });

  if (user?.role !== "client") {
    return res.status(400).json({
      status: "failure",
      message: "action not allowed—user does not fulfill role requirements",
    });
  }

  next();
};

export const userIsServiceProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, email, phoneNumber } = req.user as IJwtPayload;

  const user = await UserModel.findOne({
    $or: [
      { _id: id, email },
      { _id: id, phoneNumber },
    ],
  });

  if (user?.role === "client") {
    return res.status(400).json({
      status: "failure",
      message: "action not allowed—user does not fulfill role requirements",
    });
  }

  next();
};
