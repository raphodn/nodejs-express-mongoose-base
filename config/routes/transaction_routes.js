const express = require('express');

const transactionController = require('../../controllers/transaction_controller');

const router = express.Router();


router.route('/')
  .get(transactionController.getTransactions)
  .post(transactionController.createTransaction);

router.route('/:transaction_id')
  .get(transactionController.getTransaction);


module.exports = router;
