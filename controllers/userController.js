import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const getAllUser = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

export const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.status(200).json(user);
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};

export const updateUser = async (req, res) => {
  res.status(200).json("update user");
};

export const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    throw new BadRequestError("Please provide old or new password");

  const user = await User.findOne({ _id: req.user.userId });

  const isOldPasswordCorrect = await comparePassword(
    oldPassword,
    user.password
  );
  if (!isOldPasswordCorrect)
    throw new UnauthenticatedError("Incorrect Old Password!");

  user.password = await hashPassword(newPassword);
  await user.save();

  res.status(200).json({ message: "Success!, Password is Updated!" });
};
