import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import User from "../models/userModel.js";
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
