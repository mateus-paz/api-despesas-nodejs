const pgp = require('pg-promise')();

const db = pgp({
    user:'postgres',
    password:'postgres',
    host: 'localhost',
    port: 5432,
    database: 'DespesasApiNodeJs'
});

module.exports = db;