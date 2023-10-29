import { Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import speakeasy from "speakeasy";

import { UserModel } from "../models";
import { generateToken } from "../util";
import { IJwtPayload } from "../../types";

export const register = async (req: Request, res: Response) => {
  const { email, phoneNumber, password } = req.body;

  const existingUsers = await UserModel.find({
    $or: [{ email }, { phoneNumber }],
  });
  if (existingUsers.length > 0) {
    console.log({ existingUsers });
    return res.status(400).json({
      status: "failure",
      message: "user already exists",
    });
  }

  const hashedPassword = hashSync(password, 10);

  const newUser = new UserModel({
    email: email ? email : "",
    phoneNumber: phoneNumber ? phoneNumber : "",
    password: hashedPassword,
    accountVerified: false,
  });

  const savedUser = await newUser.save();

  // time-based otp generation
  // const secret = speakeasy.generateSecret({ length: 20 });
  // const otpToken = speakeasy.totp({
  //   secret: secret.base32,
  //   encoding: "base32",
  // });

  //TODO: add email verification

  //TODO: add phone number verification

  return res.status(200).json({
    status: "success",
    message: "new user creation successful",
    accessToken: generateToken({
      id: savedUser._id,
      email: savedUser.email,
      phoneNumber: savedUser.phoneNumber,
    }),
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, phoneNumber, password } = req.body;

  const user = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
  if (!user) {
    return res.status(404).json({
      status: "failure",
      message: "user does not exist",
    });
  }

  if (!compareSync(password, user.password)) {
    return res.status(403).json({
      status: "failure",
      message: "incorrect password",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "login successful",
    accessToken: generateToken({
      id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
    }),
  });
};

// export const passportLogin = async (req: Request, res: Response) => {
//   if (!req.user) {
//     return res.status(400).json({
//       status: "failed",
//       message: "login failed",
//     });
//   }

//   const { id, email, phoneNumber } = req.user as IJwtPayload;

//   console.log({ id, email, phoneNumber });

//   const accessToken = generateToken({ id, email, phoneNumber });

//   return res.status(200).json({
//     status: "success",
//     message: "login with passport successful",
//     accessToken,
//   });
// };

export const changePassword = async (req: Request, res: Response) => {
  const { id, email, phoneNumber } = req.user as IJwtPayload;

  const { newPassword } = req.body;

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

  const hashedPassword = hashSync(newPassword, 10);

  await UserModel.updateOne(
    { _id: user._id },
    { $set: { password: hashedPassword } }
  );

  return res.status(200).send({
    status: "success",
    message: "password change successful",
  });
};

export const deleteAccount = async (req: Request, res: Response) => {
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

  await UserModel.deleteOne({ _id: user._id });

  return res.status(200).send({
    status: "success",
    message: "user deletion successful",
  });
};
