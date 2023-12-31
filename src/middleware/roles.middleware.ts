import { Request, Response, NextFunction } from "express";

import { AppDataSource, User } from "../models";
import { IJwtPayload } from "../../types";

const UserRepository = AppDataSource.getRepository(User);

export const userIsClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({
    where: { id },
  });
  if (!user) {
    return res.status(404).json({
      status: "FAIL",
      message: "user does not exist",
    });
  }

  if (user.role !== "client") {
    return res.status(400).json({
      status: "FAIL",
      message: "user should be client",
    });
  }

  next();
};

export const userIsWorker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({
    where: { id },
    relations: {
      profile: true,
    },
  });
  if (!user) {
    return res.status(404).json({
      status: "FAIL",
      message: "user does not exist",
    });
  }

  if (user.role === "client" || user.role === "admin") {
    return res.status(403).json({
      status: "FAIL",
      message: "user should not be client",
    });
  }

  next();
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({
    where: { id },
    relations: { profile: true },
  });

  if (!user) {
    return res.status(404).json({
      status: "FAIL",
      message: "user does not exist",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      status: "FAIL",
      message: "user is not an admin",
    });
  }

  next();
};
