import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from "../controllers/reviewController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { validationReviewInput } from "../middleware/validationMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllReviews)
  .post(validationReviewInput, authenticateUser, createReview);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(validationReviewInput, authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

export default router;
