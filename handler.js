'use strict';

const api = require('lambda-api')();
const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./utils/config');
const { auth, register, status } = require('./controllers');

mongoose.connect(MONGO_CONNECTION_STRING, {
  dbName: 'serverlessAuth',
  useNewUrlParser: true,
});

api.get('/status', status);
api.post('/login', auth);
api.post('/register', register);

module.exports.run = async (event, context) => {
  return await api.run(event, context);
};
