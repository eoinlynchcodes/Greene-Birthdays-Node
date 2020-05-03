const knex = require('knex');

const config = require('../Greene-Birthdays-Node/knexfile');

const db = knex(config.development);

module.exports = db;