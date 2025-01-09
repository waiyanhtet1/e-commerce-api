import jwt from "jsonwebtoken";

export const createJWT = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

export const verifyJWT = (token) =>
  jwt.verify(token, process.env.JWT_SECRET_KEY);

export const attachCookieResponse = (res, user) => {
  // create token
  const token = createJWT({
    name: user.name,
    userId: user._id,
    role: user.role,
  });

  // set cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};
