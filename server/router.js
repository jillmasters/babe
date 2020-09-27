const router = require('express').Router();
const ctrl = require('./ctrl');

router.get('/history', ctrl.getHistory);

router.post('/transactions', ctrl.addTransaction);

router.delete('/transactions/:_id', ctrl.deleteTransaction);

router.put('/transactions/:_id', ctrl.editTransaction);

module.exports = router;
