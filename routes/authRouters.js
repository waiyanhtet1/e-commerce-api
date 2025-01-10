import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/login", validateLoginInput, login);
router.post("/register", validateRegisterInput, register);
router.get("/logout", logout);

export default router;
