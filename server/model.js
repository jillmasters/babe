const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/babe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TransactionSchema = new mongoose.Schema({
  lender: { type: String, required: true },
  amount: { type: Number, required: true },
  item: { type: String, required: true },
  date: { type: Date, required: true },
  split: { type: Number, required: true },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
