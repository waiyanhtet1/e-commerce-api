import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/jwtUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Fail to access, No Token Found!");

  try {
    const { name, userId, role } = verifyJWT(token);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Fail to access!");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("Unauthorized to access this route");

    next();
  };
};
