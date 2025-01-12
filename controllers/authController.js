import { UnauthenticatedError } from "../errors/customErrors.js";
import User from "../models/userModel.js";
import { attachCookieResponse } from "../utils/jwtUtils.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const login = async (req, res) => {
  // check if user exit by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("No User found with this email!");

  // check password is correct
  const isPassCorrect = await comparePassword(req.body.password, user.password);
  if (!isPassCorrect) throw new UnauthenticatedError("Wrong Password!");

  // create token and set cookie
  const token = attachCookieResponse(res, user);

  res.status(200).json({ message: "Login Success!", token });
};

export const register = async (req, res) => {
  // create fist register user is once admin
  req.body.role = (await User.countDocuments()) === 0 ? "admin" : "user";

  // hash password
  req.body.password = await hashPassword(req.body.password);

  // create user and attach cookie
  const user = await User.create(req.body);
  const token = attachCookieResponse(res, user);

  res.status(201).json({ message: "success!", token, user });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ message: "logout success!" });
};
