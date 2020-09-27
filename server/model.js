const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/babe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TransactionSchema = new mongoose.Schema({
  lender: { type: String, required: true }, //should be ID
  amount: { type: Number, required: true },
  item: { type: String, required: true },
  date: { type: Date, required: true },
  split: { type: Number, required: true },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: Number, required: true },
  partner_id: { type: Number, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = { Transaction, User };
