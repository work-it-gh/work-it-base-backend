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

  if (user.profile.role !== "client") {
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

  if (user.profile.role === "client") {
    return res.status(400).json({
      status: "FAIL",
      message: "user should not be client",
    });
  }

  next();
};
