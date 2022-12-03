import mongoose from "mongoose";

const WalletsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    transactions: [
      {
        transactionType: String,
        enum: ["withdraw", "deposit"],
        transactionDate: Date,
      },
    ],
  },
  { timestamps: true }
);

const Wallet = mongoose.model("wallet", WalletsSchema);

export default Wallet;
