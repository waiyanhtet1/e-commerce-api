import User from "../models/userModel.js";

export const getAllUser = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

export const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.status(200).json(user);
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json("current user");
};

export const updateUser = async (req, res) => {
  res.status(200).json("update user");
};

export const updateUserPassword = async (req, res) => {
  res.status(200).json("updateUserPassword");
};
