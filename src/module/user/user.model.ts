import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
      },
      message: "{VALUE} is not a valid email"
    },
    immutable: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },

  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "{VALUE} is not valid, please provide a valid role"
    },
    default: "user",
    required: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = model<IUser>("User", userSchema);
export default User;
