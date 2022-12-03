import mongoose from "mongoose";

export const postStatuses = ["underReview", "accepted", "refused"];

const PostSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    mainImg: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: postStatuses,
      default: "underReview",
    },
    price: {
      type: Number,
      required: true,
    },
    flatSpecs: {
      type: {
        space: {
          type: String,
          required: true,
        },
        numberOfRooms: {
          type: String,
          required: true,
        },
        flatType: {
          type: String,
          enum: ["single", "double", "villa"],
          required: true,
        },
      },
    },
    comments: [
      {
        type: {
          user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "user",
          },
          text: {
            type: String,
            required: true,
          },
          commentDate: {
            type: Date,
            required: true,
            default: Date.now,
          },
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = new mongoose.model("post", PostSchema);

export default Post;
