/* eslint no-console: 0 */
const { Transaction } = require('./model');

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

const deleteTransaction = async (req, res) => {
  try {
    const { _id } = req.params;
    Transaction.findByIdAndDelete(_id, error => {
      if (error)
        console.log(
          '---> Error while searching database by id (to delete)',
          error,
        );
    });
    res.sendStatus(204);
  } catch (error) {
    console.log('---> error deleting from database', error);
    res.status(500);
  }
};

module.exports = {
  addTransaction,
  getHistory,
  deleteTransaction,
};
