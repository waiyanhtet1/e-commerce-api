import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/userModel.js";
import { attachCookieResponse } from "../utils/jwtUtils.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const login = (req, res) => {
  res.status(200).json("login");
};

export const register = async (req, res) => {
  const isEmailExit = await User.findOne({ email: req.body.email });
  if (isEmailExit) throw new BadRequestError("Email already exit!");

  req.body.role = (await User.countDocuments()) === 0 ? "admin" : "user";
  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);
  const token = attachCookieResponse(res, user);

  res.status(201).json({ message: "success!", token, user });
};

export const logout = (req, res) => {
  res.status(200).json("logout");
};
