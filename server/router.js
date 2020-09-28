const router = require('express').Router();
const transactions = require('./controllers/transactions');
const users = require('./controllers/users');
const authenticateMe = require('./middleware/authentication');

// TRANSACTION METHODS
router.get('/history', transactions.getHistory);
router.post('/transactions', transactions.addTransaction);
router.get('/transactions/:_id', transactions.getTransaction);
router.delete('/transactions/:_id', transactions.deleteTransaction);
router.put('/transactions/:_id', transactions.editTransaction);
router.put('/edit/:name', transactions.editName);

// USER METHODS
router.post('/sign-up', users.signup);
router.post('/login', users.login);
router.get('/dashboard', authenticateMe, users.load);
router.post('/logout', authenticateMe);

module.exports = router;
