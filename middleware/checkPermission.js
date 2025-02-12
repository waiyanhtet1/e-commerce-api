import { UnauthorizedError } from "../errors/customErrors.js";

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnauthorizedError("No Authorized to access!");
};

export default checkPermission;
