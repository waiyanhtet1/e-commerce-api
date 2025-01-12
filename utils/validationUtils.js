import mongoose from "mongoose";
import { BadRequestError } from "../errors/customErrors.js";

export const validateMongoId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new BadRequestError("Invalid MongoDB Id!");
};
