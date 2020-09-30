const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/babe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TransactionSchema = new mongoose.Schema({
  lender: { type: String, required: true }, //should be email
  addedBy: { type: String, required: true }, //should be email
  amount: { type: Number, required: true },
  item: { type: String, required: true },
  date: { type: Date, required: true },
  split: { type: Number, required: true },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  partner: { type: String, required: true },
  partnerEmail: { type: String, required: true },
  currency: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = { Transaction, User };
