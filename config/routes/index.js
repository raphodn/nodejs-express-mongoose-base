const express = require('express');

const userRoutes = require('./user_routes');
const transactionRoutes = require('./transaction_routes');

const router = express.Router();


router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);


module.exports = router;
