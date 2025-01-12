import express from "express";
import {
  getAllUser,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getSingleUser);
router.get("/current-user", getCurrentUser);
router.post("/update", updateUser);
router.post("/updateUserPassword", updateUserPassword);

export default router;
