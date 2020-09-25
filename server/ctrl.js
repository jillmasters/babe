/* eslint no-console: 0 */
const Transaction = require('./model');

const getHistory = async (req, res) => {
  try {
    const allTransactions = await Transaction.find();
    res.send(allTransactions);
    res.status(200);
  } catch (error) {
    console.log('---> error retrieving from database', error);
    res.status(500);
  }
};

const addTransaction = async (req, res) => {
  try {
    const { lender, amount, item, date, split } = req.body;
    if (lender && amount && item && date && split) {
      const newTransaction = new Transaction({
        lender,
        amount,
        item,
        date,
        split,
      });
      const savedTransaction = await Transaction.create(newTransaction);
      res.send(savedTransaction);
      res.status(201);
    } else {
      res.send('Cannot create transaction (parameters missing)');
      res.status(400);
    }
  } catch (error) {
    console.log('---> error posting to database', error);
    res.status(500);
  }
};

module.exports = {
  addTransaction,
  getHistory,
};
