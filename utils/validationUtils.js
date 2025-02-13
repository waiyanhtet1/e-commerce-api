import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Product from "../models/ProductModel.js";

export const validateMongoId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new BadRequestError("Invalid MongoDB Id!");
};

export const checkProductIdExit = async (id) => {
  validateMongoId(id);

  const product = await Product.findById(id);
  if (!product) throw new NotFoundError("No Product Found!");
  return product;
};
