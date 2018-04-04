const createError = require('http-errors');

const User = require('../models/user');


exports.getUsers = (req, res, next) => {
  User.find()
    .select({ transactions: 0 })
    .exec()
    .then(users => res.json(users))
    .catch(err => next(err));
};


exports.getUser = (req, res, next) => {
  User.findById(req.params.user_id)
    .select({ transactions: 0 })
    .exec()
    .then((user) => {
      if (!user) return next(createError(404, 'No User'));
      return res.json(user);
    })
    .catch(err => next(err));
};


exports.createUser = (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
};


exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.user_id, req.body, { new: true })
    .then((user) => {
      if (!user) return next(createError(404, 'No User'));
      return res.json(user);
    })
    .catch(err => next(err));
};


exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.user_id)
    .then((user) => {
      if (!user) return next(createError(404, 'No User'));
      return res.json(user);
      // res.json({ message: "User successfully deleted!", user });
    })
    .catch(err => next(err));
};
