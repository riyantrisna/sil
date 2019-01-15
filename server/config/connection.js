const env = process.env.NODE_ENV || 'development';
const database = require('./database');
const envConfig = database[env];
const knex = require('knex');
const connection = knex(envConfig);

module.exports = connection;