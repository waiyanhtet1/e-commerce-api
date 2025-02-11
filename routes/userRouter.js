import express from "express";
import {
  getAllUser,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { validateUserParamId } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", authorizePermissions("admin"), getAllUser);
router.get("/current-user", getCurrentUser);
router.post("/update", updateUser);
router.post("/updateUserPassword", updateUserPassword);
router.get("/:id", validateUserParamId, getSingleUser);

export default router;
