const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');

const routes = require('./config/routes/index');

const app = express();


// MONGODB CONNECTION

// const dev_db_url = 'mongodb://cooluser:coolpassword@ds119748.mlab.com:19748/local_library'
// const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(config.database.url);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  // we're connected!
});


// BODY PARSER

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// CORS


// LOGS

app.use(morgan('dev'));


// ROUTES

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use('/api', routes);


// 404: catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// ERROR HANDLER

app.use((err, req, res, next) => {
  err.status = err.status || 500;

  res.status(err.status)
    .json({
      status: 'error',
      status_code: err.status,
      message: err.message
    });
});


// EXPORT

module.exports = app;
