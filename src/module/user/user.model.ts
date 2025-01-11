import { model, Schema } from "mongoose";

//USER ROLE ENUM
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Please enter a valid email address!"
    }
  },
  age: {
    type: Number,
    required: true
  },
  photo: { String },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
    default: UserRole.USER
  },
  userStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = model("User", userSchema);
export default User;
