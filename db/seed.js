const mongoose = require('mongoose');
const config = require('config');


// MODELS

const User = require('../models/user');
const Transaction = require('../models/transaction');


// MONGO CONNECTION

console.log('===== DB: CONNECT =====');

// const { port, db, secret }    = require('../config/env');
mongoose.Promise = global.Promise;
mongoose.connect(config.database.url);


// DROP DATA

console.log('===== DROPPING DATA =====');

User.collection.drop();
Transaction.collection.drop();


// CREATE DATA

console.log('===== CREATING DATA =====');

User.create([{
  username: 'user1',
  email: 'user1@email.com'
}, {
  username: 'user2',
  email: 'user2@email.com'
}])
  .then((users) => {
    console.log(`${users.length} users created`);

    // console.log(users);

    return Transaction.create([{
      sender: users[0]._id,
      recipient: users[1]._id,
      amount: 100,
      message: 'coucou'
    }])
      .then((transactions) => {
        console.log(`${transactions.length} transactions created`);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log('===== DB: DISCONNECT =====');
    // mongoose.connection.close();
    mongoose.disconnect();
  });
