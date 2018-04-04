const express = require('express');

const userController = require('../../controllers/user_controller');
const transactionController = require('../../controllers/transaction_controller');

const router = express.Router();


router.route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router.route('/:user_id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/:user_id/transactions')
  .get(transactionController.getUserTransactions);


module.exports = router;
