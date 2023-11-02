import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { IJwtPayload } from "../../types";
import { AppDataSource } from "../models/connection";
import { Profile, User } from "../models/entity";

const UserRepository = AppDataSource.getRepository(User);
const ProfileRepository = AppDataSource.getRepository(Profile);

export const createProfile = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({ where: { id } });
  if (!user) {
    return res.status(401).json({
      status: "FAIL",
      message: "user authentication failed",
    });
  }

  const { username, lastname, firstname, age, gender, profilePicture, role } =
    req.body;

  const usernameExists = await ProfileRepository.exist({ where: { username } });
  if (usernameExists) {
    return res.status(400).json({
      status: "FAIL",
      message: "username has been taken",
    });
  }

  const profile = ProfileRepository.create({
    id: uuidv4(),
    username,
    lastname,
    firstname,
    age,
    gender,
    profilePicture,
    averageRating: 0,
  });

  const savedProfile = await ProfileRepository.save(profile);

  user.profile = profile;
  await UserRepository.save(user);

  return res.status(200).json({
    status: "PASS",
    message: "new profile created",
    profile: {
      id: savedProfile.id,
      username: savedProfile.username,
      firstname: savedProfile.firstname,
      lastname: savedProfile.lastname,
      age: savedProfile.age,
      gender: savedProfile.gender,
      averageRating: savedProfile.averageRating,
      profilePicture: savedProfile.profilePicture,
    },
  });
};

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({
    where: { id },
    relations: { profile: true },
  });
  if (!user) {
    return res.status(401).json({
      status: "FAIL",
      message: "user authentication failed",
    });
  }

  return res.status(200).json({
    status: "PASS",
    message: "user profile retrieved",
    profile: user.profile,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({
    where: { id },
    relations: { profile: true },
  });
  if (!user) {
    return res.status(401).json({
      status: "FAIL",
      message: "user authentication failed",
    });
  }

  const profile = await ProfileRepository.findOne({
    where: { id: user.profile.id },
  });
  if (!profile) {
    return res.status(404).json({
      status: "FAIL",
      message: "user profile does not exist",
    });
  }

  const {
    username,
    lastname,
    firstname,
    age,
    gender,
    profilePicture,
    averageRating,
  } = req.body;

  const usernameExists = await ProfileRepository.exist({ where: { username } });
  if (usernameExists) {
    return res.status(400).json({
      status: "FAIL",
      message: "username already taken",
    });
  }

  profile.username = username ?? profile.username;
  profile.lastname = lastname ?? profile.lastname;
  profile.firstname = firstname ?? profile.firstname;
  profile.age = age ?? profile.age;
  profile.averageRating = averageRating ?? profile.averageRating;
  profile.profilePicture = profilePicture ?? profile.profilePicture;
  profile.gender = gender ?? profile.gender;

  const updatedProfile = await ProfileRepository.save(profile);

  return res.status(200).json({
    status: "PASS",
    message: "profile updated successfully",
    profile: updatedProfile,
  });
};

export const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({
    where: { id },
    relations: { profile: true },
  });
  if (!user) {
    return res.status(401).json({
      status: "FAIL",
      message: "user authentication failed",
    });
  }

  const userProfileId = user.profile.id;
  await ProfileRepository.delete({ id: userProfileId });

  return res.status(200).json({
    status: "PASS",
    message: "user profile deleted",
  });
};
