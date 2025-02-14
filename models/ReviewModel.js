import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: Number,
    title: String,
    comment: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
