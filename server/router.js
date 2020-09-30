const router = require('express').Router();
const transactions = require('./controllers/transactions');
const users = require('./controllers/users');
const authenticateMe = require('./middleware/authentication');

router.get('/', (req, res) => res.send(''));

// TRANSACTION METHODS
router.get('/history/:_id', transactions.getHistory);
router.post('/transactions', transactions.addTransaction);
router.get('/transactions/:_id', transactions.getTransaction);
router.delete('/transactions/:_id', transactions.deleteTransaction);
router.put('/transactions/:_id', transactions.editTransaction);

// USER METHODS
router.post('/sign-up', users.signup);
router.post('/login', users.login);
router.get('/dashboard', authenticateMe, users.loadUserDetails);
router.post('/logout', authenticateMe);
router.put('/:_id/:field', users.editUserDetails);

module.exports = router;
