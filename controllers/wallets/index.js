import { validationResult } from "express-validator";
import { extractErrorMessages } from "../../utils/helpers.js";
import Models from "../../models/index.js";
import mongoose from "mongoose";
import { transactionsTypes } from "../../models/wallets.js";

const postTransaction = async (req, res, next) => {
  const errors = validationResult(req.body);
  const { transaction } = req.body;

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ error: true, message: extractErrorMessages(errors.array()) });

  if (
    transactionsTypes.findIndex(
      (type) => type !== transaction.transactionType
    ) === -1
  )
    return res
      .status(400)
      .json({ error: true, message: "Wrong Transaction Type" });

  const currentUserTransaction = await Models.Wallets.findOne({
    user: mongoose.Types.ObjectId(req.user.id),
  });

  if (!currentUserTransaction) {
    const wallet = new Models.Wallets({
      user: req.user.id,
      transactions: [
        {
          transactionType: transaction.transactionType,
          quantity: transaction.quantity,
          from: transaction.from,
          to: transaction.to,
        },
      ],
    });

    if (transaction.transactionType === "withdraw")
      wallet.balance = transaction.quantity * -1;
    else wallet.balance = transaction.quantity;

    try {
      await wallet.save();
      return res.status(200).json({ message: "Wallet saved successfully" });
    } catch (e) {
      next(e);
    }
  }

  const oldTransactions = currentUserTransaction.transactions;
  currentUserTransaction.transactions = [
    ...oldTransactions,
    {
      transactionType: transaction.transactionType,
      quantity: transaction.quantity,
      from: transaction.from,
      to: transaction.to,
    },
  ];

  if (transaction.transactionType === "withdraw")
    currentUserTransaction.balance += transaction.quantity * -1;
  else currentUserTransaction.balance += transaction.quantity;

  try {
    await currentUserTransaction.save();
    return res
      .status(200)
      .json({ message: "Wallet operation done successfully" });
  } catch (e) {
    next(e);
  }
};

const getUserWalletData = async (req, res) => {
  const wallet = await Models.Wallets.findOne({
    user: mongoose.Types.ObjectId(req.user.id),
  });
  if (!wallet) return res.status(404).json({ wallet: {} });
  return res.status(200).json({ wallet });
};

export default { postTransaction, getUserWalletData };
