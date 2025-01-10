import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constants.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Name is required!"],
      // minLength: 3,
      // maxLength: 50,
    },
    email: {
      type: String,
      // unique: true,
      // required: [true, "Email is required!"],
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Invalid Email Format!",
      // },
    },
    password: {
      type: String,
      // required: [true, "Password is required!"],
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
