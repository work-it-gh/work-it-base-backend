import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../models/connection";

import { generateToken } from "../util/jwt.util";
import { IJwtPayload } from "../../types";
import { User } from "../models/entity";

const UserRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;

  const userExists = await UserRepository.exist({
    where: [{ email }, { phone }],
  });
  if (userExists) {
    return res.status(400).json({
      status: "FAIL",
      message: "user already exists",
    });
  }

  const user = UserRepository.create({
    id: uuidv4(),
    email: email ? email : "",
    phone: phone ? phone : "",
    password: bcrypt.hashSync(password, 10),
    accountVerified: false,
  });

  const savedUser = await UserRepository.save(user);

  const accessToken = generateToken({
    id: savedUser.id,
    email: savedUser.email,
    phone: savedUser.phone,
  });

  return res.status(200).json({
    status: "PASS",
    message: "new user created",
    user: {
      id: savedUser.id,
      email: savedUser.email,
      phone: savedUser.phone,
      accountVerified: savedUser.accountVerified,
    },
    accessToken,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;

  const user = await UserRepository.findOne({ where: [{ email }, { phone }] });
  if (!user) {
    return res.status(404).json({
      status: "FAIL",
      message: "user does not exist",
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      status: "FAIL",
      message: "incorrect password",
    });
  }

  const accessToken = generateToken({
    id: user.id,
    email: user.email,
    phone: user.phone,
  });

  return res.status(200).json({
    status: "PASS",
    message: "login successful",
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      accountVerified: user.accountVerified,
    },
    accessToken,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({ where: { id } });
  if (!user) {
    return res.status(401).json({
      status: "FAIL",
      message: "user authentication failed",
    });
  }

  return res.status(200).json({
    status: "PASS",
    message: "user found",
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      accountVerified: user.accountVerified,
    },
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({ where: { id } });
  if (!user) {
    return res.status(401).json({
      status: "FAIL",
      message: "user authentication failed",
    });
  }

  const { email, phone, password } = req.body;

  user.email = email ? email : user.email;
  user.phone = phone ? phone : user.phone;
  user.password = password ? bcrypt.hashSync(password, 10) : user.password;

  const updatedUser = await UserRepository.save(user);

  return res.status(200).json({
    status: "PASS",
    message: "user account updated",
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      phone: updatedUser.phone,
      accountVerified: updatedUser.accountVerified,
    },
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const userExists = await UserRepository.exist({ where: { id } });
  if (!userExists) {
    return res.status(401).json({
      status: "FAIL",
      message: "user authentication failed",
    });
  }

  await UserRepository.delete({ id });

  return res.status(200).json({
    status: "PASS",
    message: "user account deleted",
  });
};
