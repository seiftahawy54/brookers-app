import mongoose from "mongoose";

export const usersTypes = ["normal", "seller", "admin"];

const UsersSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
      minLength: 14,
      maxLength: 14,
      unique: true,
    },
    username: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    wallet: {
      type: mongoose.Types.ObjectId,
      ref: "Wallet",
    },
    userType: {
      type: String,
      enum: usersTypes,
      default: "normal",
    },
    favouritePosts: [
      {
        type: String,
        ref: "post",
      },
    ],
    chats: [{ type: mongoose.Types.ObjectId, ref: "Chat" }],
    avatar: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", UsersSchema);

export default User;
