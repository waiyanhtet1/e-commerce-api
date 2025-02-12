import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import checkPermission from "../middleware/checkPermission.js";
import User from "../models/userModel.js";
import { attachCookieResponse } from "../utils/jwtUtils.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const getAllUser = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

export const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  checkPermission(req.user, user._id);
  res.status(200).json(user);
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    throw new BadRequestError("Provide name or email values");

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    { new: true }
  );
  attachCookieResponse(res, user);
  res.status(200).json({ message: "User Updated", user });
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
