import mongoose from "mongoose";

export const transactionsTypes = ["withdraw", "deposit"];

const WalletsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        transactionType: {
          type: String,
          enum: transactionsTypes,
          transactionDate: Date,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        from: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
        to: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Wallet = mongoose.model("wallet", WalletsSchema);

export default Wallet;
