/* eslint no-console: 0 */
const { Transaction, User } = require('../model');

const getHistory = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    const { email, partnerEmail } = user;
    const allTransactions = await Transaction.find({
      $or: [{ addedBy: email }, { addedBy: partnerEmail }],
    });
    res.send(allTransactions);
    res.status(200);
  } catch (error) {
    console.log('---> error retrieving from database', error);
    res.status(500);
  }
};

const addTransaction = async (req, res) => {
  try {
    const { lender, amount, item, date, split, addedBy } = req.body;
    if (lender && amount && item && date && split && addedBy) {
      const newTransaction = new Transaction({
        lender,
        amount,
        item,
        date,
        split,
        addedBy,
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

const getTransaction = async (req, res) => {
  try {
    const { _id } = req.params;
    const matchedTransaction = await Transaction.findOne({ _id });
    res.send(matchedTransaction);
    res.status(200);
  } catch (error) {
    console.log('---> error retrieving one document from database', error);
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

const editTransaction = async (req, res) => {
  try {
    const { _id } = req.params;
    const { lender, amount, item, date, split, addedBy } = req.body;
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id },
      {
        $set: {
          lender: lender,
          amount: amount,
          item: item,
          date: date,
          split: split,
          addedBy: addedBy,
        },
      },
      { new: true },
    );
    res.send(updatedTransaction);
    res.status(200);
  } catch (error) {
    console.log('---> Error editing database', error);
    res.status(500);
  }
};

module.exports = {
  addTransaction,
  getHistory,
  getTransaction,
  deleteTransaction,
  editTransaction,
};
