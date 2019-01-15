// Update with your config settings.
const moment = require('moment');

module.exports = {

    development: {
        client: 'pg',
        version: '10.6',
        searchPath: ['knex', 'sil'],
        connection: {
            host : 'localhost',
            user : 'postgres',
            password : 'rengganes',
            database : 'sil',
        }
    },

};
