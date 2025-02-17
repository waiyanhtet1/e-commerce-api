import { BadRequestError } from "../errors/customErrors.js";
import checkPermission from "../middleware/checkPermission.js";
import Product from "../models/ProductModel.js";
import Review from "../models/ReviewModel.js";
import { checkReviewIdExit } from "../utils/validationUtils.js";

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find()
    .populate({
      path: "product",
      select: "name price",
    })
    .populate({ path: "user", select: "name email" });
  res.status(200).json({ length: reviews.length, reviews });
};

export const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await checkReviewIdExit(id);
  res.status(200).json({ review });
};

export const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const userId = req.user.userId;

  const isValidProduct = await Product.findById(productId);
  if (!isValidProduct) throw new NotFoundError("Product not found!");

  const isReviewExist = await Review.findOne({
    user: userId,
    product: productId,
  });

  if (isReviewExist)
    throw new BadRequestError("You have already reviewed this product!");

  const newReview = await Review.create({ ...req.body, user: userId });
  res.status(201).json({ message: "Review created successfully!", newReview });
};

export const updateReview = async (req, res) => {
  const review = await checkReviewIdExit(req.params.id);
  checkPermission(req.user, review.user);

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Review updated successfully!", updatedReview });
};

export const deleteReview = async (req, res) => {
  const review = await checkReviewIdExit(req.params.id);

  checkPermission(req.user, review.user);
  await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Review deleted successfully!" });
};
