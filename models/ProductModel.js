import mongoose from "mongoose";
import { PRODUCT_CATEGORY } from "../utils/constants.js";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: { type: Number, default: 0 },
    description: String,
    image: { type: String, default: "/uploads/example.jpg" },
    category: { type: String, enum: Object.values(PRODUCT_CATEGORY) },
    company: String,
    colors: [String],
    featured: { type: Boolean, default: false },
    freeShipping: { type: Boolean, default: false },
    inventory: Number,
    averageRating: { type: Number, default: 0 },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

export default mongoose.model("Product", productSchema);
