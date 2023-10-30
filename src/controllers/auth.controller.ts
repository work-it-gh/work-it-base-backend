import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { UserRepositorySingleton } from "../models/repository";
import { generateToken } from "../util/jwt.util";
import { IJwtPayload } from "../../types";

export const register = async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await UserRepositorySingleton.createUser({
    email: email ? email : "",
    phone: phone ? phone : "",
    password: hashedPassword,
    id: uuidv4(),
    accountVerified: false,
  });

  if (!user) {
    return res.status(403).json({
      status: "FAIL",
      message: "user already exists",
    });
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    phone: user.phone,
  });

  return res.status(200).json({
    status: "PASS",
    message: "new user created",
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      accountVerified: user.accountVerified,
    },
    accessToken: token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;

  const user = await UserRepositorySingleton.findUser(email, phone);

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

  const token = generateToken({
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
    accessToken: token,
  });
};

export const getAccount = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepositorySingleton.findUserById(id);

  if (!user) {
    return res.status(404).json({
      status: "FAIL",
      message: "user does not exist",
    });
  }

  return res.status(200).json({
    status: "PASS",
    message: "user account found",
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      accountVerified: user.accountVerified,
    },
  });
};

export const updateAccount = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepositorySingleton.findUserById(id);

  if (!user) {
    return res.status(404).json({
      status: "FAIL",
      message: "user does not exist",
    });
  }

  const { email, phone, password } = req.body;

  user.email = email ? email : user.email;
  user.phone = phone ? phone : user.phone;
  user.password = password ? bcrypt.hashSync(password, 10) : user.password;

  const _user = await UserRepositorySingleton.save(user);

  return res.status(200).json({
    status: "PASS",
    message: "user account updated",
    user: {
      id: _user.id,
      email: _user.email,
      phone: _user.phone,
      accountVerified: _user.accountVerified,
    },
  });
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const result = await UserRepositorySingleton.deleteUserById(id);

  if (!result) {
    return res.status(404).json({
      status: "FAIL",
      message: "user does not exist",
    });
  }

  return res.status(200).json({
    status: "PASS",
    message: "user account deleted",
  });
};
