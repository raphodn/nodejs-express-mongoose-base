const createError = require('http-errors');

const Transaction = require('../models/transaction');
const User = require('../models/user');


exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .exec()
    .then(transactions => res.json(transactions))
    .catch(err => next(err));
};


exports.getTransaction = (req, res, next) => {
  Transaction.findById(req.params.transaction_id)
    .populate('sender', { transactions: 0, created_at: 0, updated_at: 0 })
    .populate('recipient', { transactions: 0, created_at: 0, updated_at: 0 })
    .exec()
    .then((transaction) => {
      if (!transaction) return next(createError(404, 'No Transaction'));
      return res.json(transaction);
    })
    .catch(err => next(err));
};


exports.getUserTransactions = (req, res, next) => {
  User.findById(req.params.user_id)
    .select({ transactions: 0 })
    .exec()
    .then((user) => {
      if (!user) return next(createError(404, 'No User'));
      return Transaction.find()
        .or([{ sender: req.params.user_id }, { receiver: req.params.user_id }])
        .exec()
        .then(transactions => res.json(transactions))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};


exports.createTransaction = (req, res, next) => {
  Transaction.create(req.body)
    .then(transaction => res.status(201).json(transaction))
    .catch(err => next(err));
};

