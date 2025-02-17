import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { BadRequestError } from "../errors/customErrors.js";
import Product from "../models/ProductModel.js";
import Review from "../models/ReviewModel.js";
import {
  checkProductIdExit,
  validateMongoId,
} from "../utils/validationUtils.js";

export const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const newProduct = await Product.create(req.body);
  res.send({ message: "Success!", newProduct });
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ length: products.length, products });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  const product = await Product.findById(id).populate("reviews");
  if (!product) throw new NotFoundError("No Product Found!");
  res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
  await checkProductIdExit(req.params.id);

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: "Updated!", updatedProduct });
};

export const deleteProduct = async (req, res) => {
  await checkProductIdExit(req.params.id);
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Job Deleted!" });
};

export const uploadImage = async (req, res) => {
  if (!req.files) throw new BadRequestError("No Image Found!");

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "e-commerce",
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(200).json({ message: "uploaded", image: result.secure_url });
};

export const getSingleProductReview = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId })
    .populate({
      path: "product",
      select: "name price",
    })
    .populate({ path: "user", select: "name email" });
  res.status(200).json({ length: reviews.length, reviews });
};
