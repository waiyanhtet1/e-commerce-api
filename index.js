import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import morgan from "morgan";
import { authenticateUser } from "./middleware/authMiddleware.js";
import authRouter from "./routes/authRouters.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routers
app.use("/api/v1/auth", authRouter); // auth route
app.use("/api/v1/users", authenticateUser, userRouter); // user route
app.use("/api/v1/products", productRouter); // product route

// not found handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "not found!" });
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong!";
  res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB!");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
