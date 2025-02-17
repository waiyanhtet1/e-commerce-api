import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  getSingleProductReview,
  updateProduct,
  uploadImage,
} from "../controllers/productController.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";
import { validateProductInput } from "../middleware/validationMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    [validateProductInput, authenticateUser, authorizePermissions("admin")],
    createProduct
  );

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(
    [validateProductInput, authenticateUser, authorizePermissions("admin")],
    updateProduct
  )
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

router.route("/:id/reviews").get(getSingleProductReview);

export default router;
