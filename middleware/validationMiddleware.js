import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import User from "../models/userModel.js";
import { PRODUCT_CATEGORY } from "../utils/constants.js";
import { validateMongoId } from "../utils/validationUtils.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format!"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required!"),
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email Format!")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("Email already exit!");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

export const validateUserParamId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    validateMongoId(value);

    const user = await User.findById(value);
    if (!user) throw new NotFoundError("No User Found!");
  }),
]);

export const validateProductInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Product Name is required!")
    .isLength({ max: 100 })
    .withMessage("Name can not be more than 100 characters"),
  body("price").notEmpty().withMessage("Price is required!"),
  body("description")
    .notEmpty()
    .withMessage("Description is required!")
    .isLength({ max: 1000 })
    .withMessage("Description can not be more than 1000 characters"),
  body("category")
    .isIn(Object.values(PRODUCT_CATEGORY))
    .withMessage("Provide correct category name"),
  body("company").notEmpty().withMessage("Company Name is required!"),
  body("colors").notEmpty().withMessage("Colors are required!"),
  body("inventory").notEmpty().withMessage("Inventory Amount is required!"),
]);

export const validationReviewInput = withValidationErrors([
  body("rating")
    .notEmpty()
    .withMessage("Rating is required!")
    .isLength({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("title")
    .notEmpty()
    .withMessage("Title is required!")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title can not be more than 100 characters"),
  body("comment")
    .notEmpty()
    .withMessage("Comment is required!")
    .isLength({ max: 100 })
    .withMessage("Comment can not be more than 100 characters"),
]);
