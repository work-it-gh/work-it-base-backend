import { Request, Response } from "express";

import { ProfileModel, UserModel } from "../models";
import { IJwtPayload } from "../../types";

export const createProfile = async (req: Request, res: Response) => {
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

  const {
    username,
    firstName,
    lastName,
    gender,
    role,
    profilePictureUrl,
    age,
  } = req.body;

  const existingUsername = await ProfileModel.find({ username });
  if (existingUsername.length > 0) {
    return res.status(400).send({
      status: "failure",
      message: "username has already been taken",
    });
  }

  const profile = new ProfileModel({
    username,
    firstName,
    lastName,
    gender,
    role,
    profilePictureUrl,
    userId: id,
    age,
    averageRating: 0,
  });

  const savedProfile = await profile.save();

  return res.status(200).send({
    status: "success",
    message: "user profile creation successful",
    profile: {
      username: savedProfile.username,
      firstName: savedProfile.firstName,
      lastName: savedProfile.lastName,
      gender: savedProfile.gender,
      profilePictureUrl: savedProfile.profilePictureUrl,
      role: savedProfile.role,
    },
  });
};

export const updateProfile = async (req: Request, res: Response) => {
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

  const profile = await ProfileModel.findOne({ userId: user._id });
  if (!profile) {
    return res.status(404).json({
      status: "failure",
      message: "user does not have a profile",
    });
  }

  const {
    username,
    firstName,
    lastName,
    gender,
    role,
    profilePictureUrl,
    age,
    phoneNumber: _phone,
    email: _email,
  } = req.body;

  if (_phone) {
    const existingPhoneNumber = await UserModel.find({ phoneNumber: _phone });
    if (existingPhoneNumber.length > 0) {
      return res.status(400).send({
        status: "failure",
        message: "phone number has already been taken",
      });
    }
  } else {
    await UserModel.updateOne({ _id: id }, { $set: { phoneNumber: _phone } });
  }

  if (_email) {
    const existingEmail = await UserModel.find({ email: _email });
    if (existingEmail.length > 0) {
      return res.status(400).send({
        status: "failure",
        message: "email has already been taken",
      });
    }
  } else {
    await UserModel.updateOne({ _id: id }, { $set: { email: _email } });
  }

  await ProfileModel.updateOne(
    { _id: profile._id },
    {
      $set: {
        username,
        firstName,
        lastName,
        gender,
        role,
        profilePictureUrl,
        age,
      },
    }
  );

  return res.status(200).send({
    status: "success",
    message: "user profile updated successfully",
    user: {
      username,
      firstName,
      lastName,
      gender,
      profilePictureUrl,
      role,
      age,
      email: _email ? _email : user.email,
      phoneNumber: _phone ? _phone : user.phoneNumber,
    },
  });
};

export const getProfile = async (req: Request, res: Response) => {
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

  const profile = await ProfileModel.findOne({ userId: user._id });
  if (!profile) {
    return res.status(404).json({
      status: "failure",
      message: "user does not have a profile",
    });
  }

  res.status(200).send({
    status: "success",
    message: "user account found",
    user: {
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      profilePictureUrl: profile.profilePictureUrl,
      role: profile.role,
    },
  });
};
